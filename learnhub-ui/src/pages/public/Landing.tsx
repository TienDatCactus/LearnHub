import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CountUp from "react-countup";
import { MainLayout } from "../../layouts";
import CourseCard from "../../layouts/elements/CourseCard";
import { useEffect, useState } from "react";
import { API } from "../../api";

export interface Course {
    id: number;
    name: string;
    category?: {
        id: number;
        name: string;
    };
    image?: string;
    price: number;
    description: string;
    teacher: {
        id: number;
        name: string;
    };
    createdAt: string;
}

export default function Landing() {
    const [loading, setLoading] = useState(false);
    const [popularCourses, setPopularCourses] = useState<Course[]>([]);
    const getAllCourses = async () => {
        try {
            setLoading(true);
            const resp = await API.get("/public/courses");
            if (resp) {
                const popular = resp.data.filter((d: Course) => d.price > 100);
                setPopularCourses(popular);
            }
            return null;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllCourses();
    }, []);
    console.log(popularCourses);
    return (
        <MainLayout>
            <div className="page-content bg-white">
                {/* Main Slider */}
                <div
                    className="section-area section-sp1 ovpr-dark bg-fix online-cours"
                    style={{ backgroundImage: "url(assets/images/background/bg1.jpg)" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center text-white">
                                <h2>Online Courses To Learn</h2>
                                <h5>Own Your Feature Learning New Skills Online</h5>
                                <form className="cours-search">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="What do you want to learn today?"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn" type="submit">
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mw800 m-auto">
                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3>
                                                <i className="ti-user"></i>
                                                <CountUp start={0} end={5} duration={5} className="counter" />M
                                            </h3>
                                        </div>
                                        <span className="cours-search-text">Over 5 million student</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3>
                                                <i className="ti-book"></i>
                                                <CountUp start={0} end={30} duration={5} className="counter" />K
                                            </h3>
                                        </div>
                                        <span className="cours-search-text">30,000 Courses.</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3>
                                                <i className="ti-layout-list-post"></i>
                                                <CountUp start={0} end={20} duration={5} className="counter" />K
                                            </h3>
                                        </div>
                                        <span className="cours-search-text">Learn Anythink Online.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Slider */}
                <div className="content-block">
                    {/* Popular Courses */}
                    <div className="section-area section-sp2 popular-courses-bx">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 heading-bx left">
                                    <h2 className="title-head">
                                        Popular <span>Courses</span>
                                    </h2>
                                    <p>
                                        It is a long established fact that a reader will be distracted by the readable
                                        content of a page
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <Slider
                                    dots={true}
                                    infinite={true}
                                    speed={500}
                                    slidesToShow={4}
                                    slidesToScroll={1}
                                    className="courses-carousel col-12 p-lr0">
                                    {!!popularCourses.length &&
                                        popularCourses.map((course) => {
                                            return (
                                                <CourseCard
                                                    key={course.id.toString()}
                                                    id={course.id}
                                                    title={course.name}
                                                    imagePath={course?.image}
                                                    category={course?.category?.name}
                                                    price={course.price}
                                                />
                                            );
                                        })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                    {/* Popular Courses END */}
                    <div
                        className="section-area section-sp2 bg-fix ovbl-dark join-bx text-center"
                        style={{ backgroundImage: "url(assets/images/background/bg1.jpg)" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="join-content-bx text-white">
                                        <h2>
                                            Learn a new skill online on <br /> your time
                                        </h2>
                                        <h4>
                                            <CountUp start={0} end={57000} duration={5} className="counter" /> Online
                                            Courses
                                        </h4>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            Lorem Ipsum has been the industry's standard dummy text ever since the
                                            1500s, when an unknown printer took a galley of type and scrambled it to
                                            make a type specimen book.Lorem Ipsum is simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                            text ever since the 1500s, when an unknown printer took a galley of type and
                                            scrambled it to make a type specimen book.
                                        </p>
                                        <a href="/register" className="btn button-md">
                                            Join Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Form END */}
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-b30">
                                    <h2 className="title-head ">
                                        Learn a new skill online
                                        <br /> <span className="text-primary"> on your time</span>
                                    </h2>
                                    <h4>
                                        <CountUp start={0} end={57000} duration={5} className="counter" /> Online
                                        Courses
                                    </h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                        unknown printer took a galley of type.
                                    </p>
                                    <a href="/register" className="btn button-md">
                                        Join Now
                                    </a>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon1.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Our Philosophy</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon2.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Kingster's Principle</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon3.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Key Of Success</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon4.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Our Philosophy</h5>
                                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div
                        className="section-area section-sp1 bg-fix ovbl-dark text-white"
                        style={{ backgroundImage: "url(assets/images/background/bg1.jpg)" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                                    <div className="counter-style-1">
                                        <div className="text-white">
                                            <CountUp start={0} end={3000} duration={5} className="counter" />
                                            <span>+</span>
                                        </div>
                                        <span className="counter-text">Completed Projects</span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                                    <div className="counter-style-1">
                                        <div className="text-white">
                                            <CountUp start={0} end={2500} duration={5} className="counter" />
                                            <span>+</span>
                                        </div>
                                        <span className="counter-text">Happy Clients</span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                                    <div className="counter-style-1">
                                        <div className="text-white">
                                            <CountUp start={0} end={1500} duration={5} className="counter" />
                                            <span>+</span>
                                        </div>
                                        <span className="counter-text">Questions Answered</span>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30">
                                    <div className="counter-style-1">
                                        <div className="text-white">
                                            <CountUp start={0} end={1000} duration={5} className="counter" />
                                            <span>+</span>
                                        </div>
                                        <span className="counter-text">Ordered Coffee's</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Testimonials END */}
                    {/* Testimonials ==== */}
                    <div className="section-area section-sp2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 heading-bx left">
                                    <h2 className="title-head text-uppercase">
                                        what people <span>say</span>
                                    </h2>
                                    <p>
                                        It is a long established fact that a reader will be distracted by the readable
                                        content of a page
                                    </p>
                                </div>
                            </div>
                            <Slider
                                dots={true}
                                infinite={true}
                                speed={500}
                                slidesToShow={2}
                                slidesToScroll={1}
                                className="testimonial-carousel col-12 p-lr0">
                                <div className="item position-relative">
                                    <div className="testimonial-bx">
                                        <div className="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic1.jpg" alt="" />
                                        </div>
                                        <div className="testimonial-info">
                                            <h5 className="name">Peter Packer</h5>
                                            <p>-Art Director</p>
                                        </div>
                                        <div className="testimonial-content">
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item position-relative">
                                    <div className="testimonial-bx">
                                        <div className="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic2.jpg" alt="" />
                                        </div>
                                        <div className="testimonial-info">
                                            <h5 className="name">Peter Packer</h5>
                                            <p>-Art Director</p>
                                        </div>
                                        <div className="testimonial-content">
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                                industry. Lorem Ipsum has been the industry's standard dummy text ever
                                                since the 1500s, when an unknown printer took a galley of type...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    {/* Testimonials END ==== */}
                </div>
                {/* contact area END */}
            </div>
        </MainLayout>
    );
}
