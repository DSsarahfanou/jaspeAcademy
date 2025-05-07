import { Nunito } from 'next/font/google'
import LoginLinks from '../LoginLinks';
const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const ShopLayout = ({ children }) => {
    return (
        <>
            <LoginLinks/>
            {children}
        </>
    )
}

export default ShopLayout
