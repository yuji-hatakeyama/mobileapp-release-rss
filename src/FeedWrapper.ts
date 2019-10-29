import { Feed } from 'feed';

export class FeedWrapper {
  private title: string;
  private description: string;
  private generator: string;
  private id: string;
  private link: string;
  private updated: Date;
  private image: string;
  private favicon: string;
  private copyright: string;

  private itemTitle: string;
  private itemGuid: string;
  private itemLink: string;
  private itemDescription: string;
  private itemDate: Date;

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getGenerator(): string {
    return this.generator;
  }

  public getId(): string {
    return this.id;
  }

  public getLink(): string {
    return this.link;
  }

  public getUpdated(): Date {
    return this.updated;
  }

  public getImage(): string {
    return this.image;
  }

  public getFavicon(): string {
    return this.favicon;
  }

  public getCopyright(): string {
    return this.copyright;
  }

  public getItemTitle(): string {
    return this.itemTitle;
  }

  public getItemGuid(): string {
    return this.itemGuid;
  }

  public getItemLink(): string {
    return this.itemLink;
  }

  public getItemDescription(): string {
    return this.itemDescription;
  }

  public getItemDate(): Date {
    return this.itemDate;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setGenerator(generator: string): void {
    this.generator = generator;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setLink(link: string): void {
    this.link = link;
  }

  public setUpdated(updated: Date): void {
    this.updated = updated;
  }

  public setImage(image: string): void {
    this.image = image;
  }

  public setFavicon(favicon: string): void {
    this.favicon = favicon;
  }

  public setCopyright(copyright: string): void {
    this.copyright = copyright;
  }

  public setItemTitle(itemTitle: string): void {
    this.itemTitle = itemTitle;
  }

  public setItemGuid(itemGuid: string): void {
    this.itemGuid = itemGuid;
  }

  public setItemLink(itemLink: string): void {
    this.itemLink = itemLink;
  }

  public setItemDescription(itemDescription: string): void {
    this.itemDescription = itemDescription;
  }

  public setItemDate(itemDate: Date): void {
    this.itemDate = itemDate;
  }

  public rss2(): string {
    const feed = new Feed({
      title: this.title,
      description: this.description,
      generator: this.generator,
      id: this.id,
      link: this.link,
      updated: this.updated,
      language: 'ja', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
      image: this.image,
      favicon: this.favicon,
      copyright: this.copyright,
      feedLinks: {},
      author: {},
    });

    feed.addItem({
      title: this.itemTitle,
      guid: this.itemGuid,
      link: this.itemLink,
      description: this.itemDescription,
      date: this.itemDate,
    });
    return feed.rss2();
  }
}
