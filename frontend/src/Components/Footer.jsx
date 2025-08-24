import React from "react";
import { footer } from "../Data/Data";
import logo from "../assets/explosivefitness.jpeg";

import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitter } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

import { TbArrowBigUpFilled } from "react-icons/tb";

const Footer = ({ nav }) => {
  const date = new Date().getFullYear();

  return (
    <section className=" text-white  w-full bg-footer-pattern bg-center bg-cover bg-no-repeat">
      {nav ? (
        <a href="#home">
          <div className="bg-[red] w-14 h-14 fixed right-10 bottom-10 text-2xl flex justify-center items-center rounded-full cursor-pointer hover:bg-black hover:border-2 hover:border-[red]">
            <TbArrowBigUpFilled />
          </div>
        </a>
      ) : (
        "none"
      )}
      <div className="padding-hero-y px-20">
        {footer.map((val) => (
          <div key={val.title}>
            <h1 className=" text-2xl font-medium mb-8">{val.title}</h1>
            {val.footerLinks.map((li) => (
              <ul key={li.link} className=" mb-3">
                <li className=" text-xl tracking-wide text-gray-400 font font-thin hover:translate-x-1 duration-300">
                  <a href="#home">{li.link}</a>
                </li>
              </ul>
            ))}
          </div>
        ))}

        <div>
          <div className="  flex items-center justify-center gap-5 cursor-pointer text-2xl mt-[35px] text-slate-200 max-sm:text-xl">
            <BiLogoFacebook className=" hover:-scale-x-110 duration-300" />
            <BsTwitter className=" hover:-scale-x-110 duration-300" />
            <FaGlobe className=" hover:-scale-x-110 duration-300" />
            <BsInstagram className=" hover:-scale-x-110 duration-300" />
          </div>
        </div>
      </div>

      <div className=" border-t border-[#3e3e3e] max-container pt-10 pb-16 text-[#c4c4c4] text-center px-4">
        <p className=" font">
          Copyright &copy;{date} All rights reserved{" "}
          <a className="font text-white hover:text-gray-400">GEN-E</a>
        </p>
      </div>
    </section>
  );
};

export default Footer;
