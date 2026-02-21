import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

import { LineChart } from "react-native-gifted-charts";

interface IReportsData {
  value: number;
  dataPointText: string;
  label: string;
}

type ordanationOptions = "month" | "year" | "customPeriod";

interface ITypeReportsData {
  income: IReportsData[] | [];
  outcome: IReportsData[] | [];
}

export default function ReportsView({
  reportsData,
  ordenateBy,
}: {
  reportsData: ITypeReportsData | null;
  ordenateBy: (type: ordanationOptions) => void;
}) {
  const lineData = [
    { value: 0, dataPointText: "0", label: "Jan" },
    { value: 10, dataPointText: "R$10", label: "Fev" },
    { value: 8, dataPointText: "8", label: "Mar" },
    { value: 58, dataPointText: "58", label: "Apr" },
    { value: 56, dataPointText: "56", label: "May" },
    { value: 78, dataPointText: "78", label: "Jun" },
    { value: 74, dataPointText: "74", label: "Jul" },
    { value: 100, dataPointText: "98", label: "Aug" },
    { value: 100, dataPointText: "98", label: "Sep" },
    { value: 100, dataPointText: "98", label: "Oct" },
    { value: 100, dataPointText: "98", label: "Nov" },
    { value: 100, dataPointText: "98", label: "Dec" },
  ];

  const lineData2 = [
    { value: 0, dataPointText: "0" },
    { value: 20, dataPointText: "R$20" },
    { value: 18, dataPointText: "R$18" },
    { value: 40, dataPointText: "R$40" },
    { value: 36, dataPointText: "R$36" },
    { value: 60, dataPointText: "R$60" },
    { value: 54, dataPointText: "R$54" },
    { value: 85, dataPointText: "R$85" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingBottom: 100,
          paddingTop: 50,
        }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}> Reports </Text>
        <View
          style={{
            backgroundColor: "#1C1C24",
            height: "auto",
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            marginBottom: 20,
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {" "}
            Income data{" "}
          </Text>
          <LineChart
            data={reportsData?.income.length ? reportsData.income : []} // Here I need to format the data to be used in the chart, maybe in the container I can create a function to do this and pass the formated data as prop, instead of passing the raw data and formating it here
            //data2={lineData2} // Here will be the goal line data
            height={300}
            width={290}
            initialSpacing={10}
            xAxisLabelTextStyle={{ color: "white", fontSize: 15 }}
            yAxisTextStyle={{
              color: "white",
              fontSize: 15,
              marginLeft: -20,
              zIndex: -1,
            }}
            yAxisLabelPrefix="$"
            color1="skyblue"
            color2="orange"
            textColor1="green"
            dataPointsHeight={15}
            dataPointsWidth={12}
            dataPointsColor1="#cecece"
            textShiftY={10}
            textShiftX={-12}
            textFontSize={19}
            textColor="white"
            showScrollIndicator={true}
            noOfSections={5}    // grid lines on y
            curved // smooth curves
            spacing={80} // spacing between points
            hideDataPoints={false}
            dataPointsRadius={5}
            yAxisColor="#ccc"
            xAxisColor="#ccc"
          />
        </View>

        <View
          style={{
            backgroundColor: "#1C1C24",
            height: "auto",
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            marginBottom: 20,
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {" "}
            Outcome data{" "}
          </Text>
          <LineChart
            data={reportsData?.outcome.length ? reportsData.outcome : []}
            //data2={lineData2} // Here will be the goal line data
            height={300}
            width={290}
            initialSpacing={10}
            xAxisLabelTextStyle={{ color: "white", fontSize: 15 }}
            yAxisTextStyle={{
              color: "white",
              fontSize: 15,
              marginLeft: -20,
              zIndex: -1,
            }}
            yAxisLabelPrefix="$"
            color1="skyblue"
            color2="orange"
            textColor1="green"
            dataPointsHeight={15}
            dataPointsWidth={12}
            dataPointsColor1="#cecece"
            textShiftY={10}
            textShiftX={-12}
            textFontSize={19}
            textColor="white"
            showScrollIndicator={true}
            noOfSections={5}    // grid lines on y
            curved // smooth curves
            spacing={80} // spacing between points
            hideDataPoints={false}
            dataPointsRadius={5}
            yAxisColor="#ccc"
            xAxisColor="#ccc"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // dark background like screenshot
    padding: 16,
  },
});
