import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  ShipWheelIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground absolute bottom-0 w-full px-4 py-10">
      <div className="mx-auto grid max-w-[85rem] grid-cols-1 gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link
            href={"/"}
            className="flex items-center gap-1 text-xl font-extrabold tracking-tight uppercase"
          >
            <ShipWheelIcon size={23} />
            findevs
          </Link>
          <p className="mt-2 text-sm leading-tight">
            Find developer jobs from around the world easily without much
            difficulty.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Shipping</a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#">
              <FacebookIcon />
            </a>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="#">
              <InstagramIcon />
            </a>
            <a href="#">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} FINDEVS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
