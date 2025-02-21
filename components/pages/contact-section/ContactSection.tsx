"use client";

import { useForm } from "react-hook-form";
import AnimationLottie from "@/components/helper/AnimationLottie";
import contactLottie from "@/utils/animation/contact-lottie.json";
import { Button } from "@/components/helper/CustomHtml";
import { useState } from "react";

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (data: object) => {
    setStatus("Sending...");
    try {
      console.log("Form Data:", fetch("/Api/contact"));
      const response = await fetch("/Api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Email sent successfully!");
        reset();
      } else {
        // setStatus("Failed to send email");
        setStatus(result.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send email");
    }
    console.log("Form Data:", data);
    reset();
  };

  return (
    <section id="contactSection" className=" bg-masaud-dev-purple/20">
      <div className="container p-2 py-10 lg:py-24">
        <div className="flex justify-start my-5 lg:py-8">
          <div className="flex justify-center w-full items-center">
            <span className="w-24 h-[2px] bg-[#1a1443]"></span>
            <span
              data-cursor="true"
              className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md"
            >
              Contact
            </span>
            <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side: Contact Form */}
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-lg bg-masaud-dev-dark-grey p-6 rounded-lg shadow-md"
            >
              {status && (
                <div
                  className={`${
                    status === "Email sent successfully!"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  } p-2 text-center rounded-md`}
                >
                  {status}
                </div>
              )}
              <div className="mb-4">
                <label
                  className={`block font-medium mb-1 ${
                    errors.name ? "text-red-500" : "text-masaud-dev-yellow"
                  }`}
                >
                  Name
                </label>
                <input
                  data-cursor-focusable="true"
                  placeholder="Your Name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full bg-masaud-dev-purple/20 p-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>

              <div className="mb-4">
                <label
                  className={`block font-medium mb-1 ${
                    errors.email ? "text-red-500" : "text-masaud-dev-yellow"
                  }`}
                >
                  Email
                </label>
                <input
                  data-cursor-focusable="true"
                  placeholder="Your Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full bg-masaud-dev-purple/20 p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
              </div>

              <div className="mb-4">
                <label
                  className={`block font-medium mb-1 ${
                    errors.message ? "text-red-500" : "text-masaud-dev-yellow"
                  }`}
                >
                  Message
                </label>
                <textarea
                  placeholder="Your Message"
                  data-cursor-focusable="true"
                  {...register("message", { required: "Message is required" })}
                  className={`w-full bg-masaud-dev-purple/20 p-2 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                ></textarea>
              </div>

              <Button
                type="submit"
                className="py-2 px-5 text-masaud-dev-yellow font-bold text-xl mx-auto"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Side: Lottie Animation */}
          <div className="flex justify-center items-center">
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={contactLottie} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
