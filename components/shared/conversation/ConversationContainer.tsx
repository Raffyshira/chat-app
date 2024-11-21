import { Card } from "@/components/ui/card";

type Props = React.PropsWithChildren<{}>;

const ConversationContainer = ({ children }: Props) => {
   return (
      <Card className="w-full flex h-[calc(100svh-32px)] md:h-full p-2 flex-col gap-2">
         {children}
      </Card>
   );
};

export default ConversationContainer;
