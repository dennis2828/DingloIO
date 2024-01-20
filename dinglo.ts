import {DingloIO} from "dingloio-chatwidget";


const dingloIO = new DingloIO(process.env.NEXT_PUBLIC_DINGLOIO_APIKEY as string);

export default dingloIO;