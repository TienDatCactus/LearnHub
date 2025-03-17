import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../api";
import { HomeLayout } from "../../../layouts";
import LearningLayout from "./LearningLayout";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import title from "@ckeditor/ckeditor5-heading/src/title";
import { id } from "date-fns/locale";
import { map, forEach } from "lodash";

interface Option {
    id: number;
    text: string;
}

interface Question {
    quiz_id: number;
    answers: [
        {
            option_id: number;
            chosen: boolean;
        }
    ];
}

export default function QuizResult() {
    const location = useLocation();
    const quizId = location?.state?.id;
    // if (!quizId) {
    //     return <NotFound />;
    // }
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60 * 60);
    useEffect(() => {
        setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
    }, [timer]);
    const inititalData = [
        {
            title: "Suppose the probability density function of the length of computer cables is f (x) = 0.5 from 10 to 12 millimeters. Determine the mean and standard deviation of the cable length.",
            answers: [
                {
                    name: "dat",
                    chosen: true
                },
                {
                    name: "bao",
                    chosen: false
                },
                {
                    name: "another option",
                    chosen: false
                }
            ],
            correctAnswers: [1, 2]
        }
    ];
    return (
        <HomeLayout>
            <LearningLayout>
                <div className="container-fluid">
                    <div className="w-50">
                        <h1 className="my-2">Statistics</h1>
                        <div className="row px-2 mb-3">
                            <div className="col-3 px-0">
                                <ul className="list-unstyled m-0">
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{
                                            fontSize: "10px",
                                            backgroundColor: "#f0f0f0"
                                        }}>
                                        Started on
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{
                                            fontSize: "10px",
                                            backgroundColor: "#f0f0f0"
                                        }}>
                                        State
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{
                                            fontSize: "10px",
                                            backgroundColor: "#f0f0f0"
                                        }}>
                                        Completed on
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{
                                            fontSize: "10px",
                                            backgroundColor: "#f0f0f0"
                                        }}>
                                        Time taken
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{
                                            fontSize: "10px",
                                            backgroundColor: "#f0f0f0"
                                        }}>
                                        Marks
                                    </li>
                                    <li
                                        className="fw6 border justify-content-end px-2 d-flex"
                                        style={{
                                            fontSize: "10px",
                                            backgroundColor: "#f0f0f0"
                                        }}>
                                        Grade
                                    </li>
                                </ul>
                            </div>
                            <div className="col-9 px-0">
                                <ul className="list-unstyled m-0">
                                    <li
                                        className="fw4 border px-2 "
                                        style={{
                                            fontSize: "10px"
                                        }}>
                                        Sunday, 25 February 2024, 4:33 PM
                                    </li>
                                    <li
                                        className="fw4 border px-2 "
                                        style={{
                                            fontSize: "10px"
                                        }}>
                                        Finished
                                    </li>
                                    <li
                                        className="fw4 border px-2 "
                                        style={{
                                            fontSize: "10px"
                                        }}>
                                        Sunday, 25 February 2024, 5:03 PM
                                    </li>
                                    <li
                                        className="fw4 border px-2 "
                                        style={{
                                            fontSize: "10px"
                                        }}>
                                        30 mins
                                    </li>
                                    <li
                                        className="fw4 border px-2 "
                                        style={{
                                            fontSize: "10px"
                                        }}>
                                        14.00/16.00
                                    </li>
                                    <li
                                        className="fw4 border px-2 "
                                        style={{
                                            fontSize: "10px"
                                        }}>
                                        <span className="fw7">8.75</span> out of 10.00 (<span className="fw7">88</span>
                                        %)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <ul className="m-0">
                        {inititalData.map((question, qIndex) => (
                            <>
                                <li key={qIndex} className="row border-bottom border-top mb-4">
                                    <div className="col-2 border-right py-2 pb-4">
                                        <p className="my-1" style={{ lineHeight: "1.5" }}>
                                            Question{" "}
                                            <span className="font-weight-bold" style={{ fontSize: "20px" }}>
                                                {qIndex + 1}
                                            </span>
                                            :
                                        </p>
                                        <p className="m-0" style={{ fontSize: "12px" }}>
                                            Not answered
                                        </p>
                                        <p className="m-0" style={{ fontSize: "12px", lineHeight: "1" }}>
                                            Marked out of 1.00
                                        </p>
                                    </div>
                                    <div className="col-10 p-0">
                                        <div className="py-2 border-bottom p-2 px-4">
                                            <h6 className="fw4 m-0">{question.title}</h6>
                                        </div>
                                        <div className="pb-0 pt-4">
                                            <h3 className="fw3 m-0 px-4" style={{ fontSize: "14px" }}>
                                                Select one:
                                            </h3>
                                            <ul className="list-unstyled ">
                                                <div className="pb-4 px-4">
                                                    {question.answers.map((answer, aIndex) => (
                                                        <li
                                                            key={aIndex}
                                                            className={`d-flex align-items-center ${question?.correctAnswers?.includes(aIndex) ? "" : ""}`}
                                                            style={{
                                                                backgroundColor: question?.correctAnswers?.includes(
                                                                    aIndex
                                                                )
                                                                    ? "#d4edda"
                                                                    : "#f8d7da",
                                                                color: question?.correctAnswers?.includes(aIndex)
                                                                    ? "#155724"
                                                                    : "#721c24",
                                                                border: "1px solid",
                                                                borderColor: question?.correctAnswers?.includes(aIndex)
                                                                    ? "#c3e6cb"
                                                                    : "#f5c6cb",
                                                                borderRadius: "4px",
                                                                padding: "10px",
                                                                marginBottom: "5px"
                                                            }}>
                                                            <div>
                                                                <input
                                                                    className="mr-2"
                                                                    type="checkbox"
                                                                    id={`questions.${qIndex}.answers.${aIndex}.chosen`}
                                                                    checked={answer.chosen}
                                                                    readOnly
                                                                />
                                                                <label
                                                                    htmlFor={`questions.${qIndex}.answers.${aIndex}.chosen`}
                                                                    className="my-0">
                                                                    {answer.name}
                                                                </label>
                                                            </div>
                                                            {question?.correctAnswers?.includes(aIndex) && (
                                                                <i className="fa fa-check text-success ml-auto"></i>
                                                            )}
                                                        </li>
                                                    ))}
                                                </div>
                                                <div
                                                    className="px-0 py-3 px-2"
                                                    style={{
                                                        backgroundColor: "#fcefdc"
                                                    }}>
                                                    The correct answer is:{" "}
                                                    <span>
                                                        {question?.answers
                                                            .filter((_, i) => question?.correctAnswers?.includes(i))
                                                            .map((answer) => answer.name)
                                                            .join(", ")}
                                                    </span>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </>
                        ))}
                    </ul>
                    <div
                        className="d-flex justify-content-end "
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "40px"
                        }}>
                        <Link className="btn" to={"/quiz/2"}>
                            {" "}
                            Submit
                        </Link>
                    </div>
                </div>
            </LearningLayout>
        </HomeLayout>
    );
}
