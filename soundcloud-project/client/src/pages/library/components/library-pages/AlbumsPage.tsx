import { Albums} from "../library-sections"
import {Recently} from "@global/Recently"
 const AlbumsPage = () => {
return (<>
<main className="border border-red-500  w-full h-fit" data-cy = "albums">
                        <header className="text-white font-semibold"> ALBUMS</header>

        <Albums></Albums>
</main>
</>);
};

export default AlbumsPage