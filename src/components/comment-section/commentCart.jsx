import Image from 'next/image'
import cameraMan from '../../../public/assets/cameraman.png'

function commentCart() {
    const cartContent =[
        {id:1, class:'xl:ml-20',title:'امیرمهدی میلانی',photo:cameraMan, role: 'فیلم بردار', text: 'من معمولا کارایی که انجام میدم بسیار حرفه ای و با کیفیت بالاست و همیشه مشکل تهیه تجهیزات رو توی کارم داشتم ، از موقع ای که با الو تجهیزات اشنا شدم زندگیم وارد یه سطح دیگه ای شده '},
        {id:2, class:'xl:mr-16  ',title:'امیرمهدی میلانی',photo:cameraMan, role: 'فیلم بردار', text: 'من معمولا کارایی که انجام میدم بسیار حرفه ای و با کیفیت بالاست و همیشه مشکل تهیه تجهیزات رو توی کارم داشتم ، از موقع ای که با الو تجهیزات اشنا شدم زندگیم وارد یه سطح دیگه ای شده '},
        {id:3, class:'xl:ml-20',title:'امیرمهدی میلانی',photo:cameraMan, role: 'فیلم بردار', text: 'من معمولا کارایی که انجام میدم بسیار حرفه ای و با کیفیت بالاست و همیشه مشکل تهیه تجهیزات رو توی کارم داشتم ، از موقع ای که با الو تجهیزات اشنا شدم زندگیم وارد یه سطح دیگه ای شده '}
    ]
  return (
    <section className="w-11/12 mx-auto xl:w-9/12 lg:relative lg:mt-44 lg:ml-5 2xl:ml-32">
        {cartContent.map((item) =>(
            <div className={`group dark:bg-primaryDark border-solid rounded-3xl mb-5 px-5 py-5 shadow-xl bg-gray-50 lg:hover:scale-110 lg:hover:bg-primaryDark lg:transition-all lg:duration-300 ${item.class}` } key={item.id}>
                <Image className=' border-solid border-4 border-primary rounded-full lg:group-hover:border-primaryYellow lg:transition-all lg:duration-300' alt='' width={70}  src={item.photo}/>
                <h2 className=' absolute mr-20  text-2xl font-bold mt-[-50px] mb-2 dark:text-primaryYellow group-hover:text-primaryYellow transition-all duration-300'>
                    {item.title}  <span className='text-base text-gray-400 group-hover:text-gray-100 transition-all duration-300'>{item.role}</span>
                </h2>
                <p className='mr-5 mt-2 group-hover:text-white transition-all duration-300'>
                    {item.text}
                </p>
            </div>
        ))}
    </section>
  )
}

export default commentCart