import React from 'react'
import Link from 'next/link'

const CourseCard = ({
    id, name, image, titledesc, duration, price
}) => {
    return (
        <Link href={`/courses/${id}`}>
        <div className="col-lg-4 col-md-6 col-6">
            <div className="single-courses-box">
                <div className="courses-image">
                    <Link href={`/courses/${id}`}>
                        <a className="d-block image">
                            <img src={image} alt={name} />
                        </a>
                    </Link>
                </div>
                <div className="courses-content">
          
                    <h3>
                        <Link href={`/courses/${id}`}>
                            <a>{name}</a>
                        </Link>
                    </h3>
                    
                    <p dangerouslySetInnerHTML={{__html: (titledesc.slice(0, 100) + "...read more")}}/>


                  


                    <ul className="courses-box-footer d-flex justify-content-between align-items-center">
                    </ul>
                </div>
            </div>
        </div>
        </Link>
    )
} 

export default CourseCard
