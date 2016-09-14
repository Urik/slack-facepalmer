import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as connect from 'connect';
import * as bodyParser from 'body-parser';
import { FACEPALM_URL } from './config';

interface SlackMessage {
    text: string,
    response_url: string
}

interface ImageResponse {
    response_type: string,
    text: string,
    attachments: { image_url: string }[]
}

interface ParsedIncomingMessage<V> extends IncomingMessage {
    body: V
}

const app = connect()
    .use(bodyParser.urlencoded({extended: true}))
    .use(({ body }: ParsedIncomingMessage<SlackMessage>, res: ServerResponse) => {
        res.statusCode = 200;
        const response: ImageResponse = {
            text: body.text || '',
            response_type: 'in_channel',
            attachments: [{ image_url: FACEPALM_URL }]
        };
        res.write(JSON.stringify(response), () => {
            res.end();
        });
    });

const PORT = process.env.PORT || 3000;
createServer(app).listen(PORT, () => {
    console.log(`Listening in ${PORT}`);
});