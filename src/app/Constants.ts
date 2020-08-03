import { HttpHeaders } from "@angular/common/http";

export class Constants {
  public static get API_BASE() {
    return "http://localhost:8080/api";
  }

  public static get DEFAULT_HTTP_OPTIONS() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
