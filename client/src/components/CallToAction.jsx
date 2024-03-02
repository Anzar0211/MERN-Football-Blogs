import { Button } from "flowbite-react";

export default function () {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tr-3xl rounded-bl-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">
                Blog Mobile Application coming soon!!
            </h2>
            <p className="text-gray-500 my-2">
                Checkout these projects
            </p>
            <Button gradientDuoTone="greenToBlue" className="rounded-tl-xl rounded-bl-none">
                <a href="#" target='_blank' rel="noopener noreferrer">
                    Github Repo
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://www.chetu.com/blogs/images/gaming/Successful-Fantasy-Sports-Portal-Software-Solutions.jpg" />
        </div>
    </div>
  )
}