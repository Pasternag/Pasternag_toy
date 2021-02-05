import { } from '@dapplets/dapplet-extension'
//import { T_TwitterFeatureConfig, ITwitterAdapter } from '@dapplets/twitter-adapter'
import EXAMPLE_IMG from './icons/smile19.png'

@Injectable
export default class TwitterFeature {
    private num = 1;
    constructor(
        @Inject("twitter-adapter.dapplet-base.eth")
        public adapter: any //ITwitterAdapter;
    ) {
        const { button } = this.adapter.exports;

        this.adapter.attachConfig({
            POST_SOUTH: [
                button({
                    initial: "DEFAULT",
                    "DEFAULT": {
                        label: `My New Button ${this.num}`,
                        img: EXAMPLE_IMG,
                        exec: async (ctx, me) => {
                            console.log(ctx);
                            console.log(me);
                            const message1 = await Core.storage.get('exampleString');
                            const message2 = await Core.storage.get('exampleHiddenString');
                            this.num += 1;
                            me.label = `My New Button ${this.num}`;
                            alert(`I wrote: ${message1}. Then wrote: ${message2}. Counter: ${this.num}.`);
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