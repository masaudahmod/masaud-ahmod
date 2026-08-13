"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/helper/CustomHtml";
import SectionHeading from "@/components/reusable-com/SectionHeading";
import { Bounce, Slide, toast } from "react-toastify";
import { RiMailSendLine } from "react-icons/ri";

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: object) => {
    toast.info("Sending...", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Slide,
    });
    try {
      const response = await fetch("/Api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Email Sent! Thanks for reaching out", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Slide,
        });
        reset();
      } else {
        toast.error(`${result.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-brand-navy p-3 border rounded-md text-brand-slateLight placeholder-brand-slate/50 outline-none transition-colors focus:border-brand-accent ${
      hasError ? "border-red-500" : "border-brand-navyMuted"
    }`;

  const labelClass = (hasError: boolean) =>
    `block font-mono text-sm mb-2 ${
      hasError ? "text-red-500" : "text-brand-accent"
    }`;

  return (
    <section id="contactSection" className="bg-brand-navy py-20">
      <div className="container">
        <SectionHeading number="05" title="Contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-lg"
          >
            <h2
              data-cursor="true"
              className="text-2xl font-semibold text-brand-slateLight mb-6"
            >
              Feel free to reach out!
            </h2>

            <div className="mb-4">
              <label className={labelClass(!!errors.name)}>Name</label>
              <input
                data-cursor-focusable="true"
                placeholder="Your Name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className={inputClass(!!errors.name)}
              />
            </div>

            <div className="mb-4">
              <label className={labelClass(!!errors.email)}>Email</label>
              <input
                data-cursor-focusable="true"
                placeholder="your@email.com"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={inputClass(!!errors.email)}
              />
            </div>

            <div className="mb-6">
              <label className={labelClass(!!errors.message)}>Message</label>
              <textarea
                placeholder="Your Message"
                rows={5}
                data-cursor-focusable="true"
                {...register("message", { required: "Message is required" })}
                className={inputClass(!!errors.message)}
              />
            </div>

            <Button
              type="submit"
              className="py-2 px-6 text-brand-accent border-brand-accent hover:bg-brand-accent/10"
            >
              Send Message
            </Button>
          </form>

          <div className="flex justify-center items-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-brand-accent/5 border border-brand-navyMuted animate-pulse-ring" />
              <div className="absolute inset-4 rounded-full bg-brand-accent/10 border border-brand-accent/20 animate-pulse-ring [animation-delay:1.25s]" />
              <div className="absolute inset-8 rounded-full bg-brand-accent/10 border border-brand-accent/20 animate-pulse-ring [animation-delay:2.25s]" />
              <RiMailSendLine
                className="text-brand-accent relative z-10"
                size={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
