import { Button } from "~/components/button";
import { Icon, ICONS } from "~/components/icon";
import { useAction } from "next-safe-action/hooks";
import { flush as flushAction } from "./api.action";
import { useLinks } from "~/features/link";

export const FlushButton = () => {
  const { execute, isExecuting } = useAction(flushAction);
  const emptyLinks = useLinks((state) => state.emptyLinks);

  const handleFlush = () => {
    execute();
    emptyLinks();
  };

  return (
    <Button
      variant="ghost"
      className="h-full group hover:bg-red-500/10 duration-200"
      onClick={handleFlush}
      loading={isExecuting}
    >
      <Icon
        path={ICONS.delete}
        className="group-hover:text-red-500 duration-150"
      />
    </Button>
  );
};
