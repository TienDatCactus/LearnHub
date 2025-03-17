import { useEffect, useState } from "react";
import { MainLayout } from "../../layouts";
import { API } from "../../api";
import { Link, useSearchParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { toast } from "react-toastify";

interface Category {
    id: number;
    name: string;
}

interface Course {
    id: number;
    name: string;
    category: Category;
    price: number;
    image: string;
    teacher: { id: number; name: string };
}

const itemsPerPage = 6;

export default function CourseList() {
    const { user } = useUser();
    const [params] = useSearchParams();
    const chosenCategory = params.get("category") || "All Courses";
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        API.get("/public/categories")
            .then((resp) => setCategories(resp.data || []))
            .catch(() => toast.error("Fetch course categories failed"));
        API.get("/public/courses")
            .then((resp) => setCourses(resp.data || []))
            .catch(() => toast.error("Fetch courses failed"));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, chosenCategory]);

    const filteredCourses = courses
        .filter((course) => course.name.toLowerCase().includes(search.toLowerCase()))
        .filter((course) => chosenCategory === "All Courses" || course.category.name === chosenCategory);

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const list = filteredCourses.slice(startIdx, startIdx + itemsPerPage);

    return (
        <MainLayout>
            <div className="page-content bg-white">
                <div
                    className="page-banner ovbl-dark"
                    style={{ backgroundImage: "url(/assets/images/banner/banner3.jpg)" }}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white">{chosenCategory}</h1>
                        </div>
                    </div>
                </div>
                <div className="content-block">
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                    <div className="widget courses-search-bx placeani">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className="form-control"
                                                    placeholder="Search Course"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget_archive">
                                        <h5 className="widget-title style-1">All Courses</h5>
                                        <ul>
                                            <li className={chosenCategory === "All Courses" ? "active" : ""}>
                                                <Link to="/courses">All</Link>
                                            </li>
                                            {categories.map((category) => (
                                                <li
                                                    key={category.id}
                                                    className={chosenCategory === category.name ? "active" : ""}
                                                    style={{
                                                        textDecoration:
                                                            chosenCategory === category.name ? "underline" : "none"
                                                    }}>
                                                    <Link to={`/courses?category=${category.name}`}>
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {!user && (
                                        <div className="widget">
                                            <Link to="/register">
                                                <img src="/assets/images/adv/adv.jpg" alt="" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12">
                                    <div className="row">
                                        {list.map((course) => (
                                            <div key={course.id} className="col-md-6 col-lg-4 col-sm-6 m-b30">
                                                <div
                                                    className="cours-bx d-flex flex-column justify-content-between"
                                                    style={{
                                                        minHeight: "340px"
                                                    }}>
                                                    <div className="action-box">
                                                        <img
                                                            src={course.image || "/assets/images/courses/pic1.jpg"}
                                                            alt="Course Image"
                                                        />
                                                        <Link to={`/courses/${course.id}`} className="btn">
                                                            Read More
                                                        </Link>
                                                    </div>
                                                    <div className="info-bx text-center">
                                                        <h5>
                                                            <Link to={`/courses/${course.id}`}>{course.name}</Link>
                                                        </h5>
                                                        <span>{course.category.name}</span>
                                                    </div>
                                                    <div className="cours-more-info">
                                                        <div className="review px-3">
                                                            <span>
                                                                <a
                                                                    href={`/teacher/${course.teacher.id}`}
                                                                    className="text-truncate ">
                                                                    {course.teacher.name}
                                                                </a>
                                                            </span>
                                                            <ul className="cours-star">
                                                                <li className="active">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li className="active">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li className="active">
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                                <li>
                                                                    <i className="fa fa-star"></i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="price">
                                                            <del>
                                                                {course.price > 0 ? `$${course.price + 100}` : "0"}
                                                            </del>
                                                            <h5>{course.price > 0 ? `$${course.price}` : "FREE"}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="col-lg-12 m-b20">
                                            <div className="pagination-bx rounded-sm gray clearfix">
                                                <ul className="pagination">
                                                    <li className={`previous ${currentPage === 1 ? "disabled" : ""}`}>
                                                        <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                                            <i className="ti-arrow-left"></i> Prev
                                                        </a>
                                                    </li>
                                                    {[...Array(totalPages)].map((_, index) => (
                                                        <li
                                                            key={index}
                                                            className={currentPage === index + 1 ? "active" : ""}>
                                                            <a href="#" onClick={() => handlePageChange(index + 1)}>
                                                                {index + 1}
                                                            </a>
                                                        </li>
                                                    ))}
                                                    <li
                                                        className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
                                                        <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                                            Next <i className="ti-arrow-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
