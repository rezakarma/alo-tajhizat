'use client'
import Link from "next/link";


const PrimaryButton = (props) => {

    const Title = <div className="flex justify-center items-center gap-2">
        <span>{props.title} </span>
        {props.svg ? props.svg : ""}
    </div>

    return <button onClick={props.onClick ? props.onClick : () => {}} className={props.className}>
        {/* <Link href={props.href ? props.href : '/equipment-rental'}>
        </Link> */}
        {Title}
    </button>
}

export default PrimaryButton;