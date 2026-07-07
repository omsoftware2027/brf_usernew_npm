import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) { }


  // Default SEO (same as index.html)
  setDefaultSeo(): void {
    const title = 'B&R Food Services Inc. | Wholesale Restaurant Supplies & Food Packaging USA';
    const description = 'B&R Food Services Inc. is your trusted wholesale supplier of food packaging, restaurant supplies, janitorial products, kitchen essentials, and disposable products with fast delivery across the USA.';
    const keywords = 'B&R Food Services Inc., wholesale restaurant supplies, food packaging, disposable food containers, takeout containers, kitchen supplies, janitorial supplies, restaurant packaging, catering supplies, food service products, wholesale food containers, commercial kitchen supplies';
    const canonical = 'https://brfood.us/';
    const image = 'https://assets.brfood.us/1692711907309_logo.png';

    this.applySeo({ title, description, keywords, canonical, image });
  }

  // Category SEO
  setCategorySeo(categoryId: number | string, categoryName: string, image?: string): void {
    const slug = this.generateSlug(categoryName);
    this.applySeo({
      title: `${categoryName} | Wholesale Restaurant Supplies | B&R Food Services Inc.`,
      description: `Shop wholesale ${categoryName} products from B&R Food Services Inc. Browse premium restaurant supplies with competitive pricing and fast delivery across the USA.`,
      keywords: 'B&R Food Services Inc., wholesale restaurant supplies, food packaging, disposable food containers, takeout containers, kitchen supplies, janitorial supplies, restaurant packaging, catering supplies, food service products',
      canonical: `${window.location.origin}/category/${categoryId}/${slug}`,
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
      keywords: `${productName}, restaurant supplies, food packaging, wholesale products`,
      canonical: `${window.location.origin}/product/${productId}/${slug}`,
      image: image || 'https://assets.brfood.us/1692711907309_logo.png'
    });
  }

  //  Common SEO updater
  private applySeo(data: any): void {
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'title', content: data.title });
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords });
    this.meta.updateTag({ property: 'og:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: data.canonical });
    this.meta.updateTag({ property: 'og:image', content: data.image });
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
}
