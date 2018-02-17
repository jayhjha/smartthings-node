/// <reference types="request-promise" />
import * as rp from 'request-promise';
export default function buildRequest(token: string, path: string, method: string, params?: {}): rp.RequestPromise;
