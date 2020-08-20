import { HttpHeaders } from "@angular/common/http";

export class Constants {
  public static get BACKEND_SERVER(): string {
    return "http://localhost:8080";
  }

  public static get API_BASE(): string {
    return `${ this.BACKEND_SERVER }/api`;
  }

  public static get DEFAULT_HTTP_OPTIONS(): object {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
