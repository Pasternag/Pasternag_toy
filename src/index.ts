import { } from '@dapplets/dapplet-extension';
//import { T_TwitterFeatureConfig, ITwitterAdapter } from '@dapplets/twitter-adapter'
import STAMP_IMG from './icons/fakeStamp.png';
import BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
    private pictureState = {};

    constructor(
        @Inject("twitter-adapter.dapplet-base.eth")
        public adapter: any //ITwitterAdapter;
    ) {
        const { button, picture } = this.adapter.exports;

        this.adapter.attachConfig({
            POST_SOUTH: [
                button({
                    initial: "DEFAULT",
                    "DEFAULT": {
                        label: 'FAKE',
                        img: BADGE_IMG,
                        exec: (ctx) => {
                            const pic = this.pictureState[ctx.id];
                            if (pic) pic.hidden = !pic.hidden;
                        }
                    }
                })
            ],
            POST_PICTURE: [
                picture({
                    initial: "DEFAULT",
                    "DEFAULT": {
                        img: STAMP_IMG,
                        init: (ctx, me) => {
                            const pic = this.pictureState[ctx.id];
                            me.hidden = pic ? pic.hidden : true; 
                            this.pictureState[ctx.id] = me;
                        }
                    }
                })
            ],
        });
    }

    public activate() {
        this.adapter.attachFeature(this);
    }

    public deactivate() {
        this.adapter.detachFeature(this);
    }
}
