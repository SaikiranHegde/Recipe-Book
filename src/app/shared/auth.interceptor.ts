import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!!', req);
        //const copiedReq = req.clone({ headers: req.headers.set('', '') });
        // const copiedReq = req.clone({ params: req.params.append('', '') });
        return next.handle(req);
    }
}