import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";

interface AppBackProps {
  className: string
}

export const AppBack: React.FC<AppBackProps> = ({ className}): React.ReactElement => {
  const router = useRouter();
  const onBack = () => router.back();
  return (
    <button onClick={onBack} className={clsx("d-flex aic", className)}>
      <img src="/static/back-arrow.svg" alt="Назад" className="mr-2" />
      <h3>Назад</h3>
    </button>
  );
};
