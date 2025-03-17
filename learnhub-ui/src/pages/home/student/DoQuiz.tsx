import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../api";
import { HomeLayout } from "../../../layouts";
import LearningLayout from "./LearningLayout";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import title from "@ckeditor/ckeditor5-heading/src/title";
import { id } from "date-fns/locale";
import { map, forEach, some } from "lodash";

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

export default function DoQuiz() {
    const location = useLocation();
    const quizId = location?.state?.id;
    // if (!quizId) {
    //     return <NotFound />;
    // }
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const navigate = useNavigate();
    const onChange = (id: number, checked: boolean) => {
        if (selectedOptions.includes(id) && checked === false) {
            setSelectedOptions(selectedOptions.filter((optionId) => optionId !== id));
        } else if (!selectedOptions.includes(id) && checked === true) {
            setSelectedOptions([...selectedOptions, id]);
        }
    };
    const submit = async () => {
        try {
            const resp = await API.post(`/students/me/quizes/${quizId}/grade`, selectedOptions);
            if (resp.status === 200) {
                navigate(`/quiz/result/${resp?.data}`);
            }
        } catch (err) {
            if (isAxiosError(err)) {
                console.error(err?.response?.data);
            } else {
                console.error((err as Error).message);
            }
            toast.error("Failed to submit quiz");
        }
    };
    const [timer, setTimer] = useState(60 * 60);
    useEffect(() => {
        setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
    }, [timer]);

    return (
        <HomeLayout>
            <div
                className="container-fluid"
                style={{
                    marginTop: "80px",
                    maxHeight: "calc(100vh - 80px)"
                }}>
                <h1 className="text-black my-2 ">Probability and Statistics - MAS291</h1>
                <div>
                    <p>
                        Time remaining:{" "}
                        <span className="badge badge-info font-weight-normal">
                            <span>
                                <i className="fa fa-clock-o  font-weight-normal" aria-hidden="true"></i>
                            </span>{" "}
                            {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                        </span>
                    </p>
                </div>
                <Formik
                    initialValues={{
                        questions: [
                            {
                                title: "Suppose the probability density function of the length of computer cables is f (x) = 0.5 from 10 to 12 millimeters. Determine the mean and standard deviation of the cable length.",
                                answers: [
                                    {
                                        name: "dat",
                                        chosen: false
                                    },
                                    {
                                        name: "bao",
                                        chosen: false
                                    },
                                    {
                                        name: "another option",
                                        chosen: false
                                    }
                                ]
                            }
                        ]
                    }}
                    onSubmit={(values) => {
                        console.log("Submitted values:", values);
                        navigate("/quiz/result/1");
                    }}>
                    {({ values, handleChange, handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <ul className="m-0">
                                {values.questions.map((question, qIndex) => (
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
                                                {/* You can add logic to detect answered/not answered */}
                                                {question.answers.some((ans) => ans.chosen)
                                                    ? "Answered"
                                                    : "Not answered"}
                                            </p>
                                            <p className="m-0" style={{ fontSize: "12px", lineHeight: "1" }}>
                                                Marked out of 1.00
                                            </p>
                                        </div>
                                        <div className="col-10 p-0">
                                            <div className="py-2 border-bottom p-2 px-4">
                                                <h6 className="fw4 m-0">{question.title}</h6>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="fw3 m-0" style={{ fontSize: "14px" }}>
                                                    Select one or more:
                                                </h3>
                                                <ul className="list-unstyled">
                                                    {question.answers.map((answer, aIndex) => (
                                                        <li key={aIndex} className="d-flex align-items-center">
                                                            <input
                                                                className="mr-2"
                                                                type="checkbox"
                                                                id={`questions.${qIndex}.answers.${aIndex}.chosen`}
                                                                name={`questions.${qIndex}.answers.${aIndex}.chosen`}
                                                                checked={answer.chosen}
                                                                onChange={() =>
                                                                    setFieldValue(
                                                                        `questions.${qIndex}.answers.${aIndex}.chosen`,
                                                                        !answer.chosen
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={`questions.${qIndex}.answers.${aIndex}.chosen`}
                                                                className="my-0">
                                                                {answer.name}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div
                                className="d-flex justify-content-end "
                                style={{
                                    position: "fixed",
                                    bottom: "20px",
                                    right: "40px"
                                }}>
                                <button type="submit" className="btn btn-secondary">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </HomeLayout>
    );
}
