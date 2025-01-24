import MySlideShow from "@/components/my-slide-show";
import MyCategoryList from "@/components/my-category-list";
import MyFeatureList from "@/components/my-feature-list";
import NewArrivals from "@/components/homepage/new-arrivals";
import BestSellings from "@/components/homepage/best-sellings";
import Promotion from "@/components/homepage/promotion";
import Blogs from "@/components/homepage/blogs";
import { APP_URL } from "@/config/env";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata = {
  title: "Thnal | Cambodia's Leading Bookshop & Publishing Platform",
  description:
    "Discover Thnal, Cambodia's online book shop! Authors, publishers, & bookshops sell & distribute books, eBooks, audiobooks.",
  keywords: [
    "Online book shop Cambodia",
    "Cambodian bookshop platform",
    "Authors and publishers selling books",
    "eBooks and audiobooks Cambodia",
    "Sell books online Cambodia",
  ],
  openGraph: {
    title: "Thnal | Cambodia's Leading Bookshop & Publishing Platform",
    description:
      "Discover Thnal, Cambodia's online book shop! Authors, publishers, & bookshops sell & distribute books, eBooks, audiobooks, & get ISBNs easily.",
    url: `${APP_URL}`, // replace with the actual Thnal URL
    type: "website",
    images: [
      {
        url: `${APP_URL}images/app_logo.png`, // replace with the actual image URL
        width: 500,
        height: 500,
        alt: "Thnal Cambodia's Leading Bookshop",
      },
    ],
  },
  twitter: {
    card: `${APP_URL}images/app_logo.png`,
    title: "Thnal | Cambodia's Leading Bookshop & Publishing Platform",
    description:
      "Discover Thnal, Cambodia's premier online book marketplace! Authors, publishers, & bookshops sell & distribute books, eBooks, audiobooks, & get ISBNs easily.",
    site: "@Thnal_com",
    creator: "@Thnal_com",
  },
};

export default function Home() {
  return (
    <div>
      <ScrollToTop />

      <MySlideShow className="mt-2 mb-8" />

      <MyCategoryList key="category-list-key" className="mb-8" />

      <NewArrivals />

      <BestSellings />

      <Promotion />

      {/* <div className="max-w-screen-xl mx-auto mb-20 space-y-4">
        <MyHeading title="Partners" />
        <MyPartnerList />
      </div> */}

      <Blogs />

      <MyFeatureList className="my-16" />
    </div>
  );
}
