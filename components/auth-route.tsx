import { useAuth } from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";

type Props = {
  children: React.ReactNode;
};

export default function AuthRoute({ children }: Props) {
  const { auth } = useAuth();
  // useEffect와 비슷한데 라우트가 focus될 때만 실행됩니다.
  // 데이터 가져오기나 이벤트 구독과 같은 부수적인 작업을 수행하는데 사용할 수 있습니다.
  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });

  return <>{children}</>;
}
