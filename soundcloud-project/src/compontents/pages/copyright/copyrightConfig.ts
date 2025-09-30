import { FormInput } from "lucide-react";

const LegalReferences = [
  { content: "Terms of Use" },
  { content: "Privacy Policy" },
  { content: "Cookie Policy" },
  { content: "Cookie Manager" },
  { content: "Community Guidelines" },
  { content: "Moderation and Enforcement Policies" },
  { content: "Law Enforcement Guidelines" },
  { content: "Transparency Reports" },
  { content: "Report Illegal Content" },
  { content: "Accessibility Statement" },
];
const CopyrightReferences = [
  { content: "Learn About Copyright" },
  { content: "Report Copyright Infringement" },
];
const AboutReferences = [
  { content: "About SoundCloud" },
  { content: "Company Information" },
  { content: "Press Information" },
];
 const firstText = `<span class = "font-bold text-[1.5rem]  "> What is copyright? </span> </br> “Copyright” is the term used to describe a number of legal rights that exist in original literary, musical, dramatic or artistic works, and in sound recordings, films, broadcasts and other creative works. Under copyright laws, these rights are exclusive to the copyright owner, and enable the copyright owner to control how their work is used and to prevent unauthorised use.</p> <br />
Originally, copyright laws allowed the creator of a work to prevent that work from being copied, but copyright laws have gradually been extended over time, and now allow copyright owners to prevent and control things like adaptation or public performance of the copyright work, inclusion of the work in a broadcast, or distribution of the work both physically and on the Internet. Because these rights are exclusive to the copyright owner, anyone wanting to do any of these things needs the permission of the copyright owner. </p> <br /> 
Copyright can exist in all sorts of things - for example, music, lyrics, photographs, artwork, books, speeches, TV programmes and movies. Also, what might appear to be a single work can include several different copyrights owned by various different people. For example, a music track by a signed artist will often include separate copyrights in the composition, the lyrics, and the sound recording. Copyright in the music and lyrics will usually be owned by the artist or music publishing company, and copyright in the sound recording will usually be owned by the artist’s record label. Use of that track, including any adaptation of the track or any uploading or sharing over the Internet, will require the permission of all of these copyright owners, either directly or through their representatives (for example, through a collecting society or performing rights organisation)`;

 export const secondText = `<span class = "mt-4 pt-4 font-bold text-[1.5rem]"> What is copyright infringement, and how can I avoid it? </span> </br>Because the rights <span className = "text-red-500 hover:text-blue-500">this text is red </span> afforded by copyright law are exclusive to the copyright owner(s), you will infringe copyright if you do any of those things without the permission of the copyright owner(s) - for example, if you copy or adapt a copyright work, or make it available on the Internet. </p> <br />
The best way to avoid copyright infringement is to ensure that you don’t use anything created by anyone else. Simple as that. </p> <br />
If you do use someone else's work, make sure you have the necessary permissions – this will usually take the form of a licence from the copyright owner(s), which you may have to pay for. There are certain instances where you may be able to use excerpts of copyrighted material without a licence – for example, if you use a small part of someone else's work for the purposes of criticism or review, or if your use constitutes "fair use" under applicable law (particularly U.S. law) – however, discussion of these exceptions is beyond the scope of this guidance. If you intend to use any part of a copyright work in reliance on any of the statutory exceptions, you should seek legal advice first.`;
export const thirdText = `
          <header class="text-[1.5rem]  font-bold">  Copyright checklist</header>
          <p class="text-[14px]">
           <p class="mb-3"> Copyright is complicated. If you have any doubt regarding the extent of your rights in any sounds, you should consult with a suitably qualified lawyer before uploading anything to SoundCloud or making any claims or counter-claims regarding your rights. However, as a general guide, here are some of the issues you might want to consider before uploading anything to SoundCloud: <br />
</p>
<span class=" text-white font-bold  text-[1.1rem]">For music uploads:</span> <br />
<span class="mb-2 pb-2">Can you answer “<span class ="font-bold">yes</span>” to all of the following questions? </span> <br />
<p class=" pt-1 pb-6 ml-4">
  <ul class="list-disc list-inside flex flex-col ">
    <li>
Did you compose the music yourself?

    </li>
    <li class="py-2">
Did you write the lyrics yourself?

    </li>
    <li>
Did you record and produce the track yourself or do you have permission from the producer or record label that made the recording?

    </li>
    <li class="py-2">
Do you have written permission from all copyright owners to use any samples contained in the track? 
    </li>
  </ul></p>
<span class="pt-4">Can you answer “<span class="font-bold">no</span>” to all of the following questions?</span> <br />
<p class="pt-3 pb-4 space-y-1 ml-4">
  <ul class="list-disc list-inside">
    <li>
Were you signed to a record label when you recorded the track?
    </li>
    <li class="py-2">
Do you have a publishing deal?

    </li>
    <li>
Are you a member of a performing rights organization or collecting society?

    </li>
    <li class="py-2">
Have you licensed your track to anyone else?

    </li>
    <li>

Does the track contain the entirety or any part of someone else's song(s) Is it based on someone else’s song(s)? 
    </li>
  </ul></p>
<p class="font-bold pt-4 pb-0 mb-0 text-[1.1rem]">For other sounds, including field recordings, podcasts, audiobooks or voice messages: </p> <br />
<span class="">Can you answer “<span className="font-bold">yes</span>” to all of the following questions? </span> <br />
<p class=" pb-4  ml-4">
  <ul class="list-disc list-inside flex flex-col gap-y-.5 space-y-[.5]">
    <li>
Is the recording spontaneous, as opposed to being recited from a script, play or book (other than one written by you)?

    </li>
    <li class="py-2">
Is it a recording of your performance?

    </li>
    <li>
Did you make the recording yourself?

    </li>
    <li class="pt-2">
Do you have the permission of anyone else appearing in the recording to upload and share the recording on SoundCloud?
    </li>
  </ul></p>
<span class="">Can you answer “<span className="font-bold">no</span>” to all of the following questions? </span> <br />
<p className=" pb-4 pt-3 ml-4">
  <ul class="list-disc list-inside flex flex-col gap-y-.5 space-y-[.5]">
    <li>
Is the recording rehearsed or recited from a script, play or book (other than one written by you)?
    </li>
    <li class="py-2">
Does the recording contain any music or excerpts from other copyright works (e.g. movie dialogue)?
    </li>
  </ul></p>

          </p>
`;
const fourthText = `<span class="text-[1.5rem] mt-8 font-bold">Further resources </span> </br> <p class = "pb-4">For information about copyright in your country, try your local copyright office: <span> <a href = "http://www.wipo.int/directory/en/urls.jsp" class = "text-blue-400">http://www.wipo.int/directory/en/urls.jsp </a> </span></p>

<p>For information on copyright laws around the world, try the World Intellectual Property Office database: <span> <a href = "http://www.wipo.int/wipolex/en/" class = "text-blue-400">http://www.wipo.int/wipolex/en/ </a> </span> </p>`

export const CopyrightText = [{text: firstText}, {text: secondText}, {text:thirdText}, {text: fourthText}];
// export cosnt secondText = 
export const CopyrightNavigationList = [{content: "What is copyright?"}, {content: "What is copyright infringement and how can I avoid it?"}, {content: "Copyright Checklist"}, {content: "Further resources"}]
export const referenceHeaders = [ {name: "Legal", reference: LegalReferences}, {name: "Copyright", reference: CopyrightReferences} ,{name: "About", reference: AboutReferences}];
