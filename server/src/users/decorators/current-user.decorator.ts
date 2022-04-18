import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (daty: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.session.userID;
  },
);
