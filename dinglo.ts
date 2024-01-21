import {DingloIO} from "dinglo-chat-widget";


const dingloIO = new DingloIO(process.env.NEXT_PUBLIC_DINGLOIO_APIKEY as string);

export default dingloIO;