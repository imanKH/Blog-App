import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer class="bg-black shadow">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-200 sm:text-center">
          © 2023{" "}
          <Link to="/" class="hover:underline">
            ActivityHub™
          </Link>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 sm:mt-0">
          <li>
            <Link to="#" class="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li class="mr-4 hover:underline md:mr-6">
            <Link to="#">Privacy Policy</Link>
          </li>
          <li>
            <Link to="#" class="mr-4 hover:underline md:mr-6">
              Licensing
            </Link>
          </li>
          <li>
            <Link to="#" class="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
