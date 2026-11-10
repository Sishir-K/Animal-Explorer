# Decison Log

## AIM
I am K.V Sishir currently a beginner web developer and I just wanted to improve my old project of an Animal Explorer/Search Website.

I wanted to build it back from the ground up to make it a site that someone might actually visit for informative purposes on  animals, their status in today's world

My goal and why I wanted to make this. Well most people would think that this project may not have any real use in the real world as many sites based on this idea have already come up and instead of building this, I could instead actually contributes to those sites and their community. 
Well back then I didn't know this. but my idea was just to make a site that resembles my old dinosaur book with al kind of interesting facts and such (._.).

PS: I am using Claude Model Sonnet 5.5 Medium for some heavy coding tasks which I will list below as to where exactly used

## Requirements

### Requirement were proposed and reviewed by claude which gave me this table. I have modified the words and columns a bit intoducing a "why" instead of "when done"

ID | Requirement | Why |

R1 | Home page has a light background of white with green accents potraying nature and just a search bar with category bubbles underneath | A first time visitor sees this minimalistic site and searches for what he needs |

R2 | Searching for animal in the search bar should open a clean detail page with one or more images and key facts along with cited sources of those facts (mostly wikepedia) | A user should get the facts and the proof in one place.

R3 | Seaching for a category instead like carnivourous,birds etc gives you a brief explanation of the category with a citation and a below grid of matching animals. | Searching birds, tells you what birds are then show a grid of birds like sparrow,pelican etc.. |

R4 | Loading screen with animal facts that the user can click left or right arrow to change facts shown only when search takes more than 2 seconds | My site may not have a big data set but just in case the loading takes more time for an unusually long time, I don't want the user to be bored. |

R5 | If nothing matches then I want to see the error message with maybe a suggestion below of did you mean ?? | Though some typos may be detected ike lyon=lion but loni may not. so I just wanted a failsafe.

R6 | Every fact and image must have a corresponding source, with appropriate link, license,and what was changed. A source and credits section sit on each animal page | I wish to give credit where it is due and possibly not make a copyright violation of my site.

R7 |  A "Read More" area that links to the full source articles when data is thin | It is to make sure that in the offchance, that we do not have data for a new organism or bacteria maybe. Then we can provide a link for who might have this information.

R8 | A keyboard shortcut for the searchbar which is default slash (/) | To make it more convinient for lazy sould like me

R9 | Works on multiple devices like phones, laptops, keyboard navigation,screen readers, light and dark mode | To enhance user experience. I would not like to zoom to 200% just to type

## Site Decisions

* Decided first to remove the view count and most popular sections in the website. These sections were very weak and prone to easy bugs. Since this is a local project this level of view count is not particularly required
* Considered to make a report section instead of a login section that directly emails to an admin account about any issues that may have occured that you wish to report.
* Each animal has a categories/attributes for their groups,tags,aliases/scientific name,status,sources[] and images[].
* Decided on a hybrid based mode where the core facts are in curated JSON and a Read More button/section for a live fetch to wikepedia
* Decided to make kebab-case Ids instead of underscores for easy URL access and to simplify searching
* Decided to choose vanilla JavaScript with JSDoc types insted of compicated TypeScript
* Decide to use the Node scripts for data and "node:test" for testing

## Technologies Used
* Frontend: HTML,CSS
* Backend: Node scripts at build time, plus browser JavaScript;no server

