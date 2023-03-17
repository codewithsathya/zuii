import SectionContainer from "./SectionContainer"
import { ReactComponent as Logo } from "../logo.svg"

const LayoutWrapper = ({children}) => {
    return (
        <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
                <header className="flex items-center justify-between py-2">
                    <div><a href="https://zuii.codewithsathya.com" aria-label=""><Logo className="mx-[-75px]"/></a></div>
                    <div className="flex items-center text-base leading-5">
                        <div className="hidden sm:block">
                            <a href="/api/auth" className="p-1 font-medium text-gray-900 hover:text-[#008cff] sm:p-4">Sign in</a>
                        </div>
                    </div>
                </header>
                <main className="mb-auto">
                    {children}
                </main>
            </div>
        </SectionContainer>
    )
}

export default LayoutWrapper;