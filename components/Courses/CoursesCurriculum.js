import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const CoursesCurriculum = ({ videos,flag }) => {
    //console.log(videos[0].course_id)
    const sendtocoursepage = async () =>{
        if(flag == 1){
            Router.push(`/my-courses/view/${videos[0].course_id}`);
        }
        else{

        }
    }


    return (
        <div className="courses-curriculum">
            <h3>Course Videos</h3>
            {videos ? (
                <ul>
                    {videos.map(video => ( 
                        <li key={video.id}>
                            
                                <a 
                                    className="d-flex justify-content-between align-items-center"
                                    onClick={() => sendtocoursepage()}
                                >
                                    <span className="courses-name">{video.name}</span>
                                    <div className="courses-meta">
                                        <span className="status locked"><i className="flaticon-password"></i></span>
                                    </div>
                                </a>
                          
                        </li>
                    ))}
                </ul>


            ) : (
                <h3>No Videos</h3>
            )}
            
        </div>


    )
}

export default CoursesCurriculum
