import { Link, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { toast } from "react-toastify";
import LearningLayout from "./LearningLayout";
import { tr, th } from "date-fns/locale";

interface QuizHistory {
    id: number;
    attemptedAt: string;
    grade: number;
}

interface Option {
    id: number;
    text: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

interface Quiz {
    title: string;
    description: string;
    questions: Question[];
    history: QuizHistory[];
}
const temp: Quiz = {
    title: "Quiz Number 1",
    description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.",
    questions: [
        {
            id: 1,
            text: " 1+1",
            options: [
                {
                    id: 1,
                    text: "A : 2"
                },
                {
                    id: 2,
                    text: "B : 3"
                },
                {
                    id: 3,
                    text: "C : 4"
                },
                {
                    id: 4,
                    text: "D : 5"
                }
            ]
        },
        {
            id: 2,
            text: " 1+2",
            options: [
                {
                    id: 1,
                    text: "A : 2"
                },
                {
                    id: 2,
                    text: "B : 3"
                },
                {
                    id: 3,
                    text: "C : 4"
                },
                {
                    id: 4,
                    text: "D : 5"
                }
            ]
        }
    ],
    history: [
        {
            id: 1,
            attemptedAt: "2025-02-12",
            grade: 6.5
        },
        {
            id: 2,
            attemptedAt: "2024-01-30",
            grade: 8.0
        },
        {
            id: 3,
            attemptedAt: "2024-01-29",
            grade: 4.5
        }
    ]
};

export default function CourseQuiz() {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(temp);
    // useEffect(() => {
    //     API.get(`/students/me/quizes/${qid}`)
    //         .then((resp) => {
    //             console.log(resp.data);
    //             setQuiz(resp.data);
    //         })
    //         .catch((err) => {
    //             toast.error((err as Error).message);
    //         });
    // }, [qid]);
    return (
        <HomeLayout>
            <LearningLayout>
                <div className="container-fluid py-4">
                    <h4
                        className="badge m-0"
                        style={{
                            fontSize: "1.5rem"
                        }}>
                        {quiz?.title}
                    </h4>
                    <div className="d-flex flex-column justify-content-between align-items-center mb-4">
                        <p className="m-0">This quiz opened at Wednesday, 15 June 2022, 7:39 AM</p>
                        <p className="m-0">
                            Time Limit : <span>30 mins</span>
                        </p>
                        <p className="m-0">
                            Grading method: <span>Highest grade</span>
                        </p>
                    </div>
                    <div>
                        <h5 className="m-0">Summary of your previous attempts :</h5>
                        <table className="table table-striped  table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Attempt</th>
                                    <th scope="col">State</th>
                                    <th scope="col" className="text-center">
                                        Marks
                                    </th>
                                    <th scope="col" className="text-center">
                                        Grade / 100
                                    </th>
                                    <th scope="col" className="text-center">
                                        Preview
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>
                                        <p className="m-0">Finished</p>
                                        <p className="m-0">Submitted Sunday, 25 February 2024, 5:03 PM</p>
                                    </td>
                                    <td className="text-center">14.00</td>
                                    <td className="text-center">8.75</td>
                                    <td className="text-center">
                                        <a
                                            href="#"
                                            style={{
                                                textDecoration: "underline"
                                            }}>
                                            Preview
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h5>Highest grade: 8.75 / 10.00.</h5>
                    <div className="w-25 mx-auto my-4">
                        <Link to={`/quiz/1/do-quiz`}>
                            <button className="btn btn-block">Do quiz</button>
                        </Link>
                    </div>
                </div>
            </LearningLayout>
        </HomeLayout>
    );
}
