import { SlideIn } from './SlideIn'
import { Bounce } from './Bounce'
import { FadeIn } from './FadeIn'

export const Animation = () => <>
    <h3 class='w-[95%] mx-0 my-[15px]'>
        <strong>Hover effects</strong>
    </h3>
    <div class="row animations w-4/5 justify-around">
        <FadeIn />
        <SlideIn />
        <Bounce />
    </div>
</>
