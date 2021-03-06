import ImageBlock from "./ImageBlock";
import ImageBlockGrid from './ImageBlockGrid';
import { twoWide, threeWide1} from './image-block-info'

import './LandingPage.css'
import HauntsList from "../HauntsList";

function LandingPage() {

    // need to update URLS for images
    let url = "https://media.cntraveler.com/photos/57ec02078300776b0f420a13/3:2/w_2046,h_1364,c_limit/haunted-forests-black-forest-germany-GettyImages-467120271.jpg"
    return (
        <div className="home-div">
            <header>
                <h1 className="home-h1">Visit the Unexplained!</h1>
                <div className="h2-container">
                    <h2>Uncover and book haunt locations with known supernatural inhabitants and rich histories.</h2>
                </div>
            </header>
            <div className="lone">
            <ImageBlock url={url} go={true} classNames='wide tall' />
            </div>
            <ImageBlockGrid classNames='two-wide' blocks={twoWide} />
            <div className="lone">
            <ImageBlock url='https://images.squarespace-cdn.com/content/v1/5a7989439f07f5f97873172d/1574954359606-OBQVGDT5OB803C94BKDA/Monsters+Movementum.jpg' classNames='wide tall cryptology' caption={["Own a Supernatural Location? Earn money with CryptSeeker.", "Host our cryptozoology and parapsychology community at your transcendental places!"]} buttonText="Learn more" buttonLink="host/signup" />
            </div>
            <ImageBlockGrid classNames="three-wide tall" blocks={threeWide1} />
          {/* <HauntsList /> */}
        </div>
    );
}

export default LandingPage;