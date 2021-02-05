import { } from '@dapplets/dapplet-extension';
//import { T_TwitterFeatureConfig, ITwitterAdapter } from '@dapplets/twitter-adapter'
import COOL_BADGE_IMG from './icons/smile19.png';
import ANGRY_BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
    private stateStorage={}
    constructor(
        @Inject("twitter-adapter.dapplet-base.eth")
        public adapter: any //ITwitterAdapter;
    ) {
        const { button, picture } = this.adapter.exports;

        this.adapter.attachConfig({
            POST_SOUTH: [
                button({
                    "DEFAULT": {
                        label: 'FAKE',
                        img: COOL_BADGE_IMG,
                        init: (ctx, me) => me.state = this.stateStorage[ctx.id] || 'DEFAULT',
                        exec: async (ctx, me) => {
                            console.log(ctx);
                            console.log(me);
                            const message = await Core.storage.get('exampleString');
                            alert(message);
                            this.stateStorage[ctx.id] = me.state = "ANOTHER";
                        }
                    },
                    "ANOTHER": {
                        label: 'FAKE',
                        img: ANGRY_BADGE_IMG,
                        exec: async (ctx, me) => {
                            this.stateStorage[ctx.id] = me.state = "DEFAULT";
                        }
                    }
                })
            ]
        });
    }

    public activate() {
        this.adapter.attachFeature(this);
    }

    public deactivate() {
        this.adapter.detachFeature(this);
    }
}
