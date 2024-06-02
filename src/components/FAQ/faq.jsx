import FaqList from './faqList';
import FaqText from './faqText'

function faq() {
  return (
    <div className='bg-bgGray h-[65rem] dark:bg-slate-800  lg:bg-bgGray xl:w-[100%]  '>
        <FaqText/>
        <FaqList/>
    </div>
  )
}

export default faq