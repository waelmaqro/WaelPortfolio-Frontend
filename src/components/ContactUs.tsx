'use client';
import React, { FormEvent, useRef, useState } from 'react'
import Image from 'next/image'
import ReCAPTCHA from 'react-google-recaptcha'
import emailjs from 'emailjs-com';
import Link from 'next/link';
import Map from './Map';

export default function ContactUs({ blockData, id }: { blockData: any, id: any }) {


    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        phone: "",
        subject: "",
    });

    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    let themeBtn = blockData.button.theme
    switch (themeBtn) {
        case "transparent":
            themeBtn = "bg-transparent"
            break;
        case "blue":
            themeBtn = "bg-[#292F36]"
            break;
        case "gold":
            themeBtn = "bg-[#CDA274]"
            break;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
      
        setForm({
          ...form,
          [name]: value,
        });
    };

    const handleSubmitLongForm = (event: FormEvent<HTMLFormElement>) => {
        console.log("Form submitted")
        event.preventDefault();
        recaptchaRef.current?.execute();

        emailjs
        .send(
            'service_6rnq887',
            'template_smzayqo',
            {
                from_name: form.name,
                to_name: "Maqro Dev Interns",
                from_email: form.email,
                message: form.message,
                from_Phone: form.phone,
                from_subject: form.subject,
            },
            'xMcSHoNR7sDjIB4IU',
        )
        .then(
            () => {
            alert("Thank you. We will get back to you as soon as possible.");

            setForm({
                name: "",
                email: "",
                message: "",
                phone: "",
                subject: "",
            });
            },
            (error) => {
            console.error(error);
            alert("Ahh, something went wrong. Please try again.");
            }
        );
    };

    const handleSubmitShortForm = (event: FormEvent<HTMLFormElement>) => {
        console.log("Form submitted")
        event.preventDefault();
        recaptchaRef.current?.execute();

        emailjs
        .send(
            'service_6rnq887',
            'template_333tr7n',
            {
                from_name: form.name,
                to_name: "Maqro Dev Interns",
                from_email: form.email,
                message: form.message,
            },
            'xMcSHoNR7sDjIB4IU'
        )
        .then(
            () => {
            alert("Thank you. We will get back to you as soon as possible.");

            setForm({
                name: "",
                email: "",
                message: "",
                phone: "",
                subject: "",
            });
            },
            (error) => {
            console.error(error);
            alert("Ahh, something went wrong. Please try again.");
            }
        );
    };

    const onReCAPTCHAChange = (captchaCode: string | null) => {
        if (!captchaCode) {
            return;
        }
        // alert(`Hey, ${email}`);
        recaptchaRef.current?.reset();
    };
     
    
    const renderSidebar = (sidebar: boolean) => {
        if (!sidebar) return (<div className='hidden' />)

        return (
            <div className='ss:w-[350px] w-[100%] ss:h-[437px] rounded-[50px] bg-[#F4F0EC] px-8 ss:py-[76px] py-[38px] ss:mb-0 mb-[60px]'>
                <div className='flex items-center mb-[30px]'>
                    {/* Email Icon */}
                    <svg className=' sm:w-[52px] w-[32px]' width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icon">
                            <circle id="Ellipse 4" cx="26" cy="26" r="26" fill="white" />
                            <g id="Group 6">
                                <path id="Vector" d="M34.8846 18H17.1154C15.9471 18 15 18.9514 15 20.125V32.875C15 34.0486 15.9471 35 17.1154 35H34.8846C36.0529 35 37 34.0486 37 32.875V20.125C37 18.9514 36.0529 18 34.8846 18Z" stroke="#CDA274" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path id="Vector_2" d="M18 21L26 28L34 21" stroke="#CDA274" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </g>
                    </svg>
                    <p className='sm:ml-[15px] ml-[8px] p-md'>info@yourdomain.com</p>
                </div>

                <div className='flex items-center mb-[30px]'>
                    {/* Phone Icon */}
                    <svg className=' sm:w-[52px] w-[32px]' width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icon">
                            <circle id="Ellipse 4" cx="26" cy="26" r="26" fill="white" />
                            <path id="Vector" d="M35.3445 33.4554C34.5429 32.6478 32.6013 31.4691 31.6593 30.9941C30.4326 30.3762 30.3317 30.3258 29.3675 31.0421C28.7243 31.5201 28.2967 31.9471 27.5441 31.7866C26.7914 31.6261 25.1558 30.721 23.7236 29.2935C22.2914 27.8659 21.3338 26.183 21.1727 25.4329C21.0117 24.6828 21.4458 24.2603 21.9194 23.6156C22.5867 22.707 22.5362 22.5556 21.9658 21.329C21.521 20.3749 20.308 18.4517 19.4972 17.6541C18.6299 16.7975 18.6299 16.9489 18.0711 17.1811C17.6162 17.3725 17.1797 17.6052 16.7672 17.8762C15.9594 18.4128 15.5112 18.8585 15.1977 19.5284C14.8842 20.1982 14.7433 21.7686 16.3623 24.7095C17.9813 27.6504 19.1171 29.1542 21.468 31.4984C23.819 33.8426 25.6268 35.1031 28.2695 36.5851C31.5387 38.416 32.7927 38.0591 33.4646 37.7461C34.1365 37.4331 34.5843 36.9889 35.1219 36.1813C35.3936 35.7695 35.6268 35.3335 35.8186 34.8789C36.0513 34.3222 36.2027 34.3222 35.3445 33.4554Z" stroke="#CDA274" stroke-width="2" stroke-miterlimit="10" />
                        </g>
                    </svg>
                    <p className='sm:ml-[15px] ml-[8px] p-md'>+1 (378) 400-1234</p>
                </div>

                <div className='flex items-center mb-[47px]'>
                    {/* World Icon */}
                    <svg className=' sm:w-[52px] w-[32px]' width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Icon">
                            <circle id="Ellipse 4" cx="26" cy="26" r="26" fill="white" />
                            <g id="Group 7">
                                <path id="Vector" d="M36 26.5C36 20.7013 31.2987 16 25.5 16C19.7013 16 15 20.7013 15 26.5C15 32.2987 19.7013 37 25.5 37C31.2987 37 36 32.2987 36 26.5Z" stroke="#CDA274" stroke-width="2" stroke-miterlimit="10" />
                                <path id="Vector_2" d="M35.4475 22.331C34.6349 22.3361 34.7148 23.844 33.7025 23.1325C33.3265 22.8689 33.0953 22.4857 32.6233 22.3692C32.2109 22.2674 31.7885 22.3732 31.3812 22.444C30.9183 22.5244 30.3693 22.5605 30.0182 22.9132C29.6787 23.2526 29.4991 23.7081 29.1379 24.0496C28.4392 24.7111 28.1442 25.4333 28.5965 26.3686C29.0316 27.2679 29.9418 27.7559 30.9238 27.6918C31.8887 27.6272 32.8909 27.0643 32.8631 28.4745C32.853 28.9732 32.9567 29.3193 33.109 29.7829C33.2501 30.2103 33.2405 30.6246 33.2729 31.0658C33.3326 31.8902 33.4834 32.8144 33.8902 33.5426L34.6491 32.4658C34.7427 32.3325 34.9385 32.1457 34.985 31.9885C35.0675 31.7101 34.9051 31.2317 34.8864 30.9198C34.8676 30.6078 34.8767 30.2918 34.8292 29.9798C34.7624 29.5427 34.5054 29.133 34.47 28.7009C34.4047 27.8964 34.5509 27.2541 33.9347 26.5814C33.3397 25.9325 32.4675 25.7768 31.6342 25.9086C31.2142 25.9747 29.5239 26.2465 30.2024 25.2811C30.3364 25.0913 30.5707 24.9356 30.7215 24.7549C30.8525 24.5976 30.9663 24.3086 31.1201 24.1859C31.2739 24.0633 31.9802 23.9223 32.1826 23.9849C32.385 24.0475 32.596 24.3412 32.7715 24.4714C33.0959 24.7172 33.4744 24.8806 33.875 24.9478C34.5661 25.0496 36.0111 24.6455 35.9999 23.7539C35.9979 23.3264 35.6033 22.731 35.4475 22.331ZM27.4475 29.6673C27.1778 28.5254 25.6352 28.1437 24.8035 27.5244C24.3254 27.1681 23.8999 26.618 23.272 26.5732C22.9826 26.5523 22.7402 26.6155 22.4534 26.5406C22.1903 26.4724 21.9839 26.33 21.7036 26.3671C21.1799 26.4363 20.8495 26.9992 20.2869 26.9228C19.7532 26.8506 19.2032 26.2226 19.0818 25.7111C18.926 25.0536 19.443 24.8404 19.997 24.7819C20.2282 24.7574 20.4878 24.731 20.7099 24.816C21.0023 24.9254 21.1405 25.2134 21.403 25.359C21.8953 25.6302 21.995 25.1966 21.9196 24.7569C21.8068 24.0984 21.6752 23.8297 22.2591 23.3768C22.6638 23.0643 23.0099 22.8384 22.9451 22.277C22.9067 21.9473 22.7271 21.7982 22.8946 21.4699C23.0215 21.2201 23.3701 20.9946 23.5973 20.8455C24.1837 20.4608 26.1093 20.4893 25.3226 19.4124C25.0913 19.0964 24.6648 18.5315 24.2601 18.4542C23.7541 18.358 23.5295 18.9259 23.1769 19.1763C22.8126 19.4353 22.1033 19.7295 21.7385 19.329C21.2477 18.79 22.0638 18.6129 22.2444 18.2369C22.425 17.8608 21.826 17.1498 21.5052 16.9697L19.997 18.671C19.9537 18.9559 19.9688 19.2467 20.0414 19.5255C20.1139 19.8044 20.2424 20.0653 20.419 20.2923C20.719 20.6806 21.1966 20.8053 21.2184 21.3356C21.2396 21.8445 21.1607 22.105 20.8298 22.4628C20.6866 22.6155 20.5854 22.8323 20.4397 22.9753C20.2611 23.1498 20.3274 23.0964 20.0486 23.1442C19.5245 23.2333 19.0782 23.3707 18.5718 23.5111C17.7279 23.7457 17.65 22.359 17.2655 21.815L16.0006 22.8424C15.9869 23.0109 16.208 23.3208 16.2682 23.504C16.6138 24.5508 17.311 25.3605 17.7613 26.362C18.2353 27.4226 19.5083 27.1284 20.0704 28.0577C20.5693 28.8821 20.0365 29.9259 20.4099 30.789C20.6811 31.4154 21.3206 31.5523 21.7618 32.0103C22.2125 32.4729 22.2029 33.106 22.2717 33.708C22.3493 34.4162 22.4753 35.1181 22.6487 35.8088C22.7099 36.0475 22.766 36.363 22.9285 36.5599C23.0398 36.6953 23.4217 36.8118 23.2674 36.8566C23.483 36.8923 23.867 37.0948 24.0466 36.9462C24.2834 36.7508 24.2201 36.1493 24.2611 35.8775C24.384 35.0683 24.7868 34.277 25.3302 33.6714C25.867 33.0739 26.6026 32.6694 27.0559 31.992C27.4976 31.3315 27.6307 30.4404 27.4475 29.6673ZM25.7582 31.0068C25.4546 31.5518 24.7787 31.9167 24.3441 32.3498C24.2262 32.4673 23.9752 32.8745 23.8275 32.7864C23.7218 32.7233 23.6858 32.1951 23.6469 32.074C23.4459 31.464 23.0622 30.9316 22.5485 30.5498C22.3901 30.4292 21.9975 30.2724 21.907 30.107C21.8058 29.9274 21.8968 29.5035 21.9004 29.3081C21.9059 29.0231 21.7769 28.5493 21.8468 28.2903C21.9277 27.9915 21.7719 28.1717 22.0375 28.1126C22.1776 28.0811 22.7564 28.1834 22.931 28.22C23.2082 28.278 23.361 28.4516 23.5796 28.6271C24.1543 29.0908 24.7873 29.4495 25.4313 29.8047C25.9302 30.0826 26.0769 30.4343 25.7582 31.0068ZM22.2368 16.985C22.4766 17.2206 22.7023 17.4995 23.06 17.5229C23.3985 17.5458 23.7177 17.3615 24.0132 17.5931C24.341 17.8475 24.5773 18.1697 25.0124 18.2491C25.4334 18.3259 25.8791 18.0786 25.9833 17.6455C26.0845 17.2328 25.8665 16.7839 25.8533 16.3697C25.8533 16.3122 25.8842 16.0567 25.8447 16.0135C25.8154 15.9809 25.5705 16.0175 25.533 16.0185C25.2588 16.0267 24.9853 16.0457 24.7124 16.0755C23.7176 16.1838 22.7434 16.4349 21.8194 16.8211C21.9424 16.9066 22.0967 16.9407 22.2368 16.985ZM30.936 19.844C31.3655 19.844 31.8016 19.6506 31.663 19.1509C31.5466 18.732 31.3483 18.2776 30.8657 18.5035C30.5585 18.647 30.1234 19.0124 30.0875 19.3748C30.0465 19.786 30.6496 19.844 30.936 19.844ZM30.5929 22.0307C31.0316 22.2949 31.6822 22.1707 32.0131 21.7936C32.2717 21.4984 32.4239 20.986 32.8889 20.9865C33.0936 20.986 33.2903 21.0667 33.4363 21.2109C33.6286 21.4109 33.5906 21.5987 33.6316 21.8491C33.7232 22.4114 34.3227 21.8811 34.4791 21.6633C34.5803 21.5213 34.7174 21.3106 34.6713 21.1259C34.6288 20.9534 34.4285 20.7697 34.3394 20.6114C34.0794 20.1534 33.8654 19.6206 33.4758 19.2506C33.1009 18.8944 32.64 18.9356 32.2843 19.3056C31.9929 19.6109 31.6544 19.8526 31.4551 20.2241C31.3144 20.4852 31.1561 20.6099 30.8712 20.6776C30.7144 20.7147 30.5353 20.7285 30.4037 20.8343C30.0374 21.1244 30.2459 21.8211 30.5929 22.0307Z" fill="#CDA274" />
                            </g>
                        </g>
                    </svg>
                    <p className='sm:ml-[15px] ml-[8px] p-md'>www.yourdomain.com</p>
                </div>

                <div className='flex gap-[35px] items-center'>
                    {/* Facebook */}
                    <Link className='hover:opacity-70' href='https://www.facebook.com/'>
                        <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.68359 10.875H7.04688V18.75H3.53125V10.875H0.648438V7.64062H3.53125V5.14453C3.53125 2.33203 5.21875 0.75 7.78516 0.75C9.01562 0.75 10.3164 0.996094 10.3164 0.996094V3.77344H8.875C7.46875 3.77344 7.04688 4.61719 7.04688 5.53125V7.64062H10.1758L9.68359 10.875Z" fill="#292F36" />
                        </svg>
                    </Link>
                    {/* Twitter */}
                    <Link className='hover:opacity-70' href='https://twitter.com/'>
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6367 4.09375C16.6367 4.26953 16.6367 4.41016 16.6367 4.58594C16.6367 9.47266 12.9453 15.0625 6.16016 15.0625C4.05078 15.0625 2.11719 14.4648 0.5 13.4102C0.78125 13.4453 1.0625 13.4805 1.37891 13.4805C3.10156 13.4805 4.68359 12.8828 5.94922 11.8984C4.33203 11.8633 2.96094 10.8086 2.50391 9.33203C2.75 9.36719 2.96094 9.40234 3.20703 9.40234C3.52344 9.40234 3.875 9.33203 4.15625 9.26172C2.46875 8.91016 1.20312 7.43359 1.20312 5.64062V5.60547C1.69531 5.88672 2.29297 6.02734 2.89062 6.0625C1.87109 5.39453 1.23828 4.26953 1.23828 3.00391C1.23828 2.30078 1.41406 1.66797 1.73047 1.14062C3.55859 3.35547 6.30078 4.83203 9.35938 5.00781C9.28906 4.72656 9.25391 4.44531 9.25391 4.16406C9.25391 2.125 10.9062 0.472656 12.9453 0.472656C14 0.472656 14.9492 0.894531 15.6523 1.63281C16.4609 1.45703 17.2695 1.14062 17.9727 0.71875C17.6914 1.59766 17.1289 2.30078 16.3555 2.75781C17.0938 2.6875 17.832 2.47656 18.4648 2.19531C17.9727 2.93359 17.3398 3.56641 16.6367 4.09375Z" fill="#292F36" />
                        </svg>
                    </Link>
                    {/* Linkedin */}
                    <Link className='hover:opacity-70' href='https://www.linkedin.com/'>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.14062 16.5V5.98828H0.871094V16.5H4.14062ZM2.48828 4.58203C3.54297 4.58203 4.38672 3.70312 4.38672 2.64844C4.38672 1.62891 3.54297 0.785156 2.48828 0.785156C1.46875 0.785156 0.625 1.62891 0.625 2.64844C0.625 3.70312 1.46875 4.58203 2.48828 4.58203ZM16.3398 16.5H16.375V10.7344C16.375 7.92188 15.7422 5.74219 12.4375 5.74219C10.8555 5.74219 9.80078 6.62109 9.34375 7.42969H9.30859V5.98828H6.17969V16.5H9.44922V11.2969C9.44922 9.92578 9.69531 8.625 11.3828 8.625C13.0703 8.625 13.1055 10.1719 13.1055 11.4023V16.5H16.3398Z" fill="#292F36" />
                        </svg>
                    </Link>
                    {/* Insta */}
                    <Link className='hover:opacity-70' href='https://www.instagram.com/'>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.60742C6.625 4.60742 4.73242 6.53711 4.73242 8.875C4.73242 11.25 6.625 13.1426 9 13.1426C11.3379 13.1426 13.2676 11.25 13.2676 8.875C13.2676 6.53711 11.3379 4.60742 9 4.60742ZM9 11.6582C7.47852 11.6582 6.2168 10.4336 6.2168 8.875C6.2168 7.35352 7.44141 6.12891 9 6.12891C10.5215 6.12891 11.7461 7.35352 11.7461 8.875C11.7461 10.4336 10.5215 11.6582 9 11.6582ZM14.418 4.45898C14.418 3.90234 13.9727 3.45703 13.416 3.45703C12.8594 3.45703 12.4141 3.90234 12.4141 4.45898C12.4141 5.01562 12.8594 5.46094 13.416 5.46094C13.9727 5.46094 14.418 5.01562 14.418 4.45898ZM17.2383 5.46094C17.1641 4.125 16.8672 2.9375 15.9023 1.97266C14.9375 1.00781 13.75 0.710938 12.4141 0.636719C11.041 0.5625 6.92188 0.5625 5.54883 0.636719C4.21289 0.710938 3.0625 1.00781 2.06055 1.97266C1.0957 2.9375 0.798828 4.125 0.724609 5.46094C0.650391 6.83398 0.650391 10.9531 0.724609 12.3262C0.798828 13.6621 1.0957 14.8125 2.06055 15.8145C3.0625 16.7793 4.21289 17.0762 5.54883 17.1504C6.92188 17.2246 11.041 17.2246 12.4141 17.1504C13.75 17.0762 14.9375 16.7793 15.9023 15.8145C16.8672 14.8125 17.1641 13.6621 17.2383 12.3262C17.3125 10.9531 17.3125 6.83398 17.2383 5.46094ZM15.457 13.7734C15.1973 14.5156 14.6035 15.0723 13.8984 15.3691C12.7852 15.8145 10.1875 15.7031 9 15.7031C7.77539 15.7031 5.17773 15.8145 4.10156 15.3691C3.35938 15.0723 2.80273 14.5156 2.50586 13.7734C2.06055 12.6973 2.17188 10.0996 2.17188 8.875C2.17188 7.6875 2.06055 5.08984 2.50586 3.97656C2.80273 3.27148 3.35938 2.71484 4.10156 2.41797C5.17773 1.97266 7.77539 2.08398 9 2.08398C10.1875 2.08398 12.7852 1.97266 13.8984 2.41797C14.6035 2.67773 15.1602 3.27148 15.457 3.97656C15.9023 5.08984 15.791 7.6875 15.791 8.875C15.791 10.0996 15.9023 12.6973 15.457 13.7734Z" fill="#292F36" />
                        </svg>
                    </Link>
                </div>
            </div>
        )
    }

    const shortForm = (
        <div key={id}  className='flex justify-center items-center max-w-7xl mx-auto px-10'>
            <form method="post" onSubmit={handleSubmitShortForm}>
                <div className='mb-[77px] max-w-[634px] text-center flex justify-center items-center mx-auto'>
                    <h1>{blockData.title}</h1>
                </div>
                <div className='flex flex-col justify-start text-black'>
                    <div className='grid grid-cols-2 gap-4 mx-auto mb-[57px]'>
                        {/* name */}
                        <div className='flex-col'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Name</label></p>
                                <input
                                    id='name'
                                    type='text'
                                    maxLength={20}
                                    name='name'
                                    onChange={handleChange}
                                    className='invalid:border-red-500'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* email */}
                        <div className='flex-col'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Email</label></p>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    className='invalid:border-red-500'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* content */}
                        <div className='col-span-2 px-1 mt-[57px]'>
                            <p><label className='py-2'>Hello, Iam Interested in..</label></p>
                            <textarea
                                id='message'
                                name='message'
                                rows={5}
                                cols={60}
                                maxLength={300}
                                onChange={handleChange}
                                className='resize-none p-2 font-Jost text-[22px] text-[#4D5053] w-[100%]'
                                required />
                            <hr />
                        </div>
                        <div className='col-span-2 flex flex-col justify-center items-center mt-[77px]'>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey="6Lemo9wmAAAAAIr7KMRKBZZz7_imGGfRu-wA9p4L"
                                onChange={onReCAPTCHAChange}
                            />
                            <button type='submit' className={`text-white font-Jost flex justify-center items-center rounded-[18px] ${themeBtn} hover:bg-[#434950] 
                                py-[26px] px-[37px] xs:text-[18px] xxs:text-[14px] xxxs:text-[14px]`}>
                                {blockData.button.buttonLabel}
                                <Image className='ml-[10px]' src={blockData.button.icon.data.attributes.url} width={20} height={20} alt={blockData.button.icon.data.attributes.alternativeText} loading='lazy' />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

    const longForm = (
        <div key={id} className='flex justify-center items-center max-w-7xl mx-auto px-10'>

            <form className='w-[100%]' action="" method="post" onSubmit={handleSubmitLongForm}>
                <div className='mb-[77px] max-w-[634px] text-center flex justify-center items-center mx-auto'>
                    <h1>{blockData.title}</h1>
                </div>

                <div className='flex ss:flex-row flex-col justify-start md:gap-[55px] gap-[25px] text-black'>
                    {renderSidebar(blockData.hasSidebar)}
                    
                    <div className=' grow grid grid-cols-2 gap-4 mx-auto mb-[57px]'>

                        {/* Name  */}
                        <div className='flex-col'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Name</label></p>
                                <input
                                    id='name'
                                    type='text'
                                    maxLength={20}
                                    name='name'
                                    onChange={handleChange}
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Email */}
                        <div className='flex-col'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Email</label></p>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Subject */}
                        <div className='flex-col mt-[57px]'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Subject</label></p>
                                <input
                                    id='subject'
                                    type='text'
                                    name='subject'
                                    onChange={handleChange}
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Phone */}
                        <div className='flex-col mt-[57px]'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Phone</label></p>
                                <input
                                    id='phone'
                                    type='tel'
                                    maxLength={12}
                                    name='phone'
                                    onChange={handleChange}
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Body */}
                        <div className='col-span-2 px-1 mt-[57px]'>
                            <p><label className='py-2'>Hello, I am Interested in..</label></p>
                            <textarea
                                id='message'
                                name='message'
                                rows={5}
                                cols={60}
                                maxLength={300}
                                onChange={handleChange}
                                className='resize-none p-2 font-Jost text-[22px] text-[#4D5053] w-[100%]'
                                required />
                            <hr />
                        </div>
                        <div className='col-span-2 flex flex-col items-end mt-[77px]'>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey="6Lemo9wmAAAAAIr7KMRKBZZz7_imGGfRu-wA9p4L"
                                onChange={onReCAPTCHAChange}
                            />
                            <button type='submit' className={`text-white max-w-[220px] font-Jost flex justify-center items-center rounded-[18px] ${themeBtn} hover:bg-[#434950] 
                                py-[26px] px-[37px] xs:text-[18px] xxs:text-[14px] xxxs:text-[14px]`}>
                                {blockData.button.buttonLabel}
                                <Image className='ml-[10px]' src={blockData.button.icon.data.attributes.url} width={20} height={20} alt={blockData.button.icon.data.attributes.alternativeText} loading='lazy' />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    )

    const blogForm = (
        <div key={id} className='flex justify-center items-center max-w-7xl mx-auto px-10'>

            <form className='w-[100%]' action="" method="post" onSubmit={handleSubmitLongForm}>
                <div className='mb-[77px] max-w-[634px] text-center flex justify-center items-center mx-auto'>
                    <h1>{blockData.title}</h1>
                </div>

                <div className='flex ss:flex-row flex-col justify-start md:gap-[55px] gap-[25px] text-black'>
                    {renderSidebar(blockData.hasSidebar)}
                    
                    <div className=' grow grid grid-cols-2 gap-4 mx-auto mb-[57px]'>

                        {/* Name  */}
                        <div className='flex-col'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Name</label></p>
                                <input
                                    id='name'
                                    type='text'
                                    maxLength={20}
                                    name='name'
                                    onChange={handleChange}
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Email */}
                        <div className='flex-col'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Email</label></p>
                                <input
                                    id='email'
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Subject */}
                        <div className='flex-col mt-[57px]'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Website</label></p>
                                <input
                                    id='subject'
                                    type='text'
                                    name='subject'
                                    onChange={handleChange}
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Phone */}
                        <div className='flex-col mt-[57px]'>
                            <div className='pb-2 flex'>
                                <p><label className='px-2'>Phone</label></p>
                                <input
                                    id='phone'
                                    type='tel'
                                    maxLength={12}
                                    name='phone'
                                    onChange={handleChange}
                                    className='invalid:border-red-500 w-[100%] px-2'
                                    required />
                            </div>
                            <hr />
                        </div>

                        {/* Body */}
                        <div className='col-span-2 px-1 mt-[57px]'>
                            <p><label className='py-2'>Hello, I am Interested in..</label></p>
                            <textarea
                                id='message'
                                name='message'
                                rows={5}
                                cols={60}
                                maxLength={300}
                                onChange={handleChange}
                                className='resize-none p-2 font-Jost text-[22px] text-[#4D5053] w-[100%]'
                                required />
                            <hr />
                        </div>
                        <div className='col-span-2 flex flex-col items-end mt-[77px]'>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey="6Lemo9wmAAAAAIr7KMRKBZZz7_imGGfRu-wA9p4L"
                                onChange={onReCAPTCHAChange}
                            />
                            <button type='submit' className={`text-white max-w-[220px] font-Jost flex justify-center items-center rounded-[18px] ${themeBtn} hover:bg-[#434950] 
                                py-[26px] px-[37px] xs:text-[18px] xxs:text-[14px] xxxs:text-[14px]`}>
                                {blockData.button.buttonLabel}
                                <Image className='ml-[10px]' src={blockData.button.icon.data.attributes.url} width={20} height={20} alt={blockData.button.icon.data.attributes.alternativeText} loading='lazy' />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
    )

    const renderForm = (formType: string) => {
        switch (formType) {
            case "None":
                return (<div>Not a form</div>)
            case "Short Form":
                return shortForm
            case "Full Form":
                return longForm
            default:
                return (<div><h1>Error</h1></div>)
        }
    }

    return (
        <div className='flex justify-center flex-col items-center'>
            {renderForm(blockData.formType)}
            {blockData.isMapVisible === true ? <Map /> : ""}
        </div>
    )

}
