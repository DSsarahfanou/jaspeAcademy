import { Nunito } from 'next/font/google'
import LoginLinks from '../LoginLinks';
const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const CourseLayout = ({ children }) => {
    return (
        <>
            <LoginLinks/>
            {children}
        </>
    )
}

export default CourseLayout
