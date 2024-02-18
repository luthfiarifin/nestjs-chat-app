import { ArgumentMetadata, BadRequestException, Injectable, ValidationPipe } from "@nestjs/common";

@Injectable()
export class ValidateInputPipe extends ValidationPipe {

    public async transform(value, metadata: ArgumentMetadata) {
        try {
            return await super.transform(value, metadata);
        } catch (e) {
            if (e instanceof BadRequestException) {
                const messages = e.getResponse()['message'];
                if (messages) {
                    throw new BadRequestException({
                        message: messages[0],
                        messages: messages,
                    });
                } else {
                    throw e;
                }
            }
        }
    }
}