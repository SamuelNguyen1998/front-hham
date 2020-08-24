export class Constants {
  public static get BACKEND_SERVER(): string {
    return "http://localhost:8080";
  }

  public static get API_BASE(): string {
    return `${ this.BACKEND_SERVER }/api`;
  }
}
