import { getChannelById, getChannelsByCategory } from "@/lib/actions";
import ChannelView from "@/components/channel-view";
import ChannelNotFound from "@/components/channel-not-found";

export default async function ChannelPage({ params }: { params: { id: string } }) {
  const channel = await getChannelById(params.id);

  if (!channel) {
    return <ChannelNotFound />;
  }

  const relatedChannels = await getChannelsByCategory(channel.category, channel.id);
  
  return <ChannelView channel={channel} relatedChannels={relatedChannels} />;
}
