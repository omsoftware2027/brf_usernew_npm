import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, shareReplay } from 'rxjs';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private defaultSeo: any = null;
  private defaultSeoRequest$?: Observable<any>;
  private readonly siteUrl = environment.siteUrl;

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    private dashboardService: DashboardService,
  ) { }


  // Default SEO (same as index.html)
  setDefaultSeo(): void {
    if (this.defaultSeo) {
      this.applyDefaultSeo(this.defaultSeo);
      return;
    }
    if (!this.defaultSeoRequest$) {
      this.defaultSeoRequest$ = this.dashboardService.getcontactus().pipe(shareReplay(1));
    }
    this.defaultSeoRequest$.subscribe({
      next: (res: any) => {
        if (res?.status === 0 && res?.response) {
          this.defaultSeo = res.response;
          this.applyDefaultSeo(this.defaultSeo);
        } else {
          this.applyDefaultSeo();
        }
      },
      error: () => {
        this.applyDefaultSeo();
      }
    });
  }

  private applyDefaultSeo(data?: any): void {
    const title =
      data?.metaTitle ||
      'B&R Food Services Inc. | Wholesale Restaurant Supplies & Food Packaging USA';
    const description =
      data?.metaDescription ||
      'B&R Food Services Inc. is your trusted wholesale supplier of food packaging, restaurant supplies, janitorial products, kitchen essentials, and disposable products with fast delivery across the USA.';
    const keywords =
      data?.metaTags ||
      'B&R Food Services Inc., wholesale restaurant supplies, food packaging, disposable food containers, takeout containers, kitchen supplies, janitorial supplies, restaurant packaging, catering supplies, food service products, wholesale food containers, commercial kitchen supplies';
    this.applySeo({
      title,
      description,
      keywords,
      canonical: `${this.siteUrl}/`,
      image: 'https://assets.brfood.us/1692711907309_logo.png'
    });
  }

  // Category SEO
  setCategorySeo(categoryId: number | string, categoryName: string, image?: string): void {
    const slug = this.generateSlug(categoryName);
    this.applySeo({
      title: `${categoryName} | Wholesale Restaurant Supplies | B&R Food Services Inc.`,
      description: `Shop wholesale ${categoryName} products from B&R Food Services Inc. Browse premium restaurant supplies with competitive pricing and fast delivery across the USA.`,
      keywords: this.getDefaultKeywords(),
      canonical: `${this.siteUrl}/category/${categoryId}/${slug}`,
      image: image || 'https://assets.brfood.us/1692711907309_logo.png',
      ogTitle: `${categoryName} Food Packaging | Wholesale Restaurant Supplies`,
      twitterTitle: `${categoryName} Food Packaging`
    });
  }

  // Product SEO
  setProductSeo(productId: number | string, productName: string, image?: string): void {
    const slug = this.generateSlug(productName);

    this.applySeo({
      title: `${productName} | B&R Food Services Inc.`,
      description: `Buy ${productName} from B&R Food Services Inc. Premium restaurant supplies with fast delivery across the USA.`,
      keywords: this.getDefaultKeywords(),
      canonical: `${this.siteUrl}/product/${productId}/${slug}`,
      image: image || 'https://assets.brfood.us/1692711907309_logo.png'
    });
  }

  //  Common SEO updater
  private applySeo(data: any): void {
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'title', content: data.title });
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords });
    this.meta.updateTag({ name: 'robots', content: data.robots || 'index, follow'});

    this.meta.updateTag({ property: 'og:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: data.canonical });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:site_name', content: 'B&R Food Services Inc.' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image'});
    this.meta.updateTag({ name: 'twitter:title', content: data.twitterTitle || data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image });
    this.setCanonical(data.canonical);
  }

  // Canonical URL
  private setCanonical(url: string): void {
    let link = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  // Slug Generator
  generateSlug(name: any): string {
    try {
      if (name === null || name === undefined) {
        return '';
      }

      return String(name)
        .toLowerCase()
        .trim()
        .replace(/&/g, ' ')
        .replace(/[()'",./\\]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
    } catch (error) {
      return String(name);
    }
  }

  private getDefaultKeywords(): string {
    return this.defaultSeo?.metaTags ||
      'B&R Food Services Inc., wholesale restaurant supplies, food packaging, disposable food containers, takeout containers, kitchen supplies, janitorial supplies, restaurant packaging, catering supplies, food service products, wholesale food containers, commercial kitchen supplies';
  }
}
