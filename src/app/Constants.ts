import { HttpHeaders } from "@angular/common/http";

export class Constants {
  public static get DOC_BASE(): string {
    return "http://localhost:8080";
  }

  public static get API_BASE(): string {
    return `${this.DOC_BASE}/api`;
  }

  public static get DEFAULT_HTTP_OPTIONS(): object {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
