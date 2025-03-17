import { Navigate, useSearchParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { UserRole } from "../../types/User";
import StudentCourseList from "./student/StudentCourseList";
import TeacherCourseList from "./teacher/TeacherCourseList";

export default function UserProfile() {
    const { user } = useUser();
    const [params] = useSearchParams();
    const status = params.get("status") || "all";
    if (user?.role === UserRole.STUDENT) {
        return <StudentCourseList status={status} />;
    } else if (user?.role === UserRole.TEACHER) {
        return <TeacherCourseList />;
    } else {
        return <Navigate to="/404" replace />;
    }
}
