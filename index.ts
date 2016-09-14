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
    attachments: { text: string, image_url: string }[]
}

interface ParsedIncomingMessage<V> extends IncomingMessage {
    body: V
}

const app = connect()
    .use(bodyParser.urlencoded({extended: true}))
    .use(({ body }: ParsedIncomingMessage<SlackMessage>, res: ServerResponse) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const response: ImageResponse = {
            response_type: 'in_channel',
            attachments: [{ image_url: FACEPALM_URL, text: body.text || '' }]
        };
        res.write(JSON.stringify(response), () => {
            res.end();
        });
    });

const PORT = process.env.PORT || 3000;
createServer(app).listen(PORT, () => {
    console.log(`Listening in ${PORT}`);
});