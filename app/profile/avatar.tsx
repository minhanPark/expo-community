import { AvatarItem } from "@/components/avatar-item";
import FixedButtonCTA from "@/components/fixed-bitton-cta";
import Tab from "@/components/tab";
import useGetAvatarItems from "@/hooks/queries/useGetAvatarItems";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

export default function Screen() {
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const [currentTab, setCurrentTab] = useState(0);
  const pagerRef = useRef<PagerView | null>(null);

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {["모자", "얼굴", "상의", "하의", "손", "피부"].map((tab, index) => (
            <Tab
              key={index}
              isActive={currentTab === index}
              onPress={() => handlePressTab(index)}
            >
              {tab}
            </Tab>
          ))}
        </View>
        <PagerView
          ref={pagerRef}
          initialPage={0}
          style={styles.pagerView}
          onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
        >
          <FlatList
            key="1"
            data={hats}
            keyExtractor={(item, index) => String(index)}
            // 여러개 보여줌
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            key="2"
            data={faces}
            keyExtractor={(item, index) => String(index)}
            // 여러개 보여줌
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            key="3"
            data={tops}
            keyExtractor={(item, index) => String(index)}
            // 여러개 보여줌
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            key="4"
            data={bottoms}
            keyExtractor={(item, index) => String(index)}
            // 여러개 보여줌
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            key="5"
            data={hands}
            keyExtractor={(item, index) => String(index)}
            // 여러개 보여줌
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
          <FlatList
            key="7"
            data={skins}
            keyExtractor={(item, index) => String(index)}
            // 여러개 보여줌
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem uri={item} isSelected={false} />
            )}
          />
        </PagerView>
      </View>
      <FixedButtonCTA label="저장" onPress={() => {}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  pagerView: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: "center",
  },
});
