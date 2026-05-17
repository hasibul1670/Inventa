import {
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICES, MicroservicePayload } from '@app/common';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';

@Injectable()
export class MicroserviceProxy {
  constructor(
    @Inject(SERVICES.AUTH) readonly auth: ClientProxy,
    @Inject(SERVICES.USER) readonly user: ClientProxy,
    @Inject(SERVICES.PARTY) readonly party: ClientProxy,
    @Inject(SERVICES.INVENTORY) readonly inventory: ClientProxy,
    @Inject(SERVICES.SALES) readonly sales: ClientProxy,
  ) {}

  async send<TResponse, TData = unknown>(
    client: ClientProxy,
    pattern: string,
    payload: MicroservicePayload<TData>,
  ): Promise<TResponse> {
    return firstValueFrom(
      client.send<TResponse>(pattern, payload).pipe(
        timeout(5000),
        catchError((error) => {
          if (error.name === 'TimeoutError') {
            return throwError(
              () => new RequestTimeoutException('Microservice request timed out'),
            );
          }
          return throwError(
            () =>
              new InternalServerErrorException(
                error?.message ?? 'Microservice request failed',
              ),
          );
        }),
      ),
    );
  }
}
