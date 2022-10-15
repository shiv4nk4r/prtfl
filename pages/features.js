import {
  createStyles,
  Title,
  SimpleGrid,
  Text,
  Button,
  ThemeIcon,
  Grid,
  Col,
} from "@mantine/core";
import {
  IconReceiptOff,
  IconFlame,
  IconCircleDotted,
  IconFileCode,
} from "@tabler/icons";
import React, { useState, useEffect } from "react";
import {
  fetchFeaturesList,
  fetchHeaderItems,
} from "../supabaseProvider/SupabaseClient";
import HeaderComponent from "../components/HeaderComponent";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 36,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const featureIcons = {
  IconReceiptOff: IconReceiptOff,
  IconFileCode: IconFileCode,
  IconCircleDotted: IconCircleDotted,
  IconFlame: IconFlame,
};

const featuresItems = [
  {
    icon: IconReceiptOff,
    title: "Free and open source",
    description:
      "All packages are published under MIT license, you can use Mantine in any project",
  },
  {
    icon: IconFileCode,
    title: "TypeScript based",
    description:
      "Build type safe applications, all components and hooks export types",
  },
  {
    icon: IconCircleDotted,
    title: "No annoying focus ring",
    description:
      "With new :focus-visible selector focus ring will appear only when user navigates with keyboard",
  },
  {
    icon: IconFlame,
    title: "Flexible",
    description:
      "Customize colors, spacing, shadows, fonts and many other settings with global theme object",
  },
];

function features() {
  const { classes } = useStyles();
  const [featuresList, setFeaturesList] = useState(featuresItems);

  // State to store the header items
  const [headerLinks, setHeaderLinks] = useState([
    { label: "Stage", link: "/stage" },
  ]);

  /**
   * Function to fetch the header items from supabase
   */
  const fetchNavBar = async () => {
    let data = await fetchHeaderItems();
    setHeaderLinks(data);
  };

  const fetchFeaturesListFromDB = async () => {
    let data = await fetchFeaturesList();
    console.log(data);
    data.forEach((element) => {
      element.icon = featureIcons[element.icon];
    });
    setFeaturesList(data);
  };

  useEffect(() => {
    fetchFeaturesListFromDB();
    fetchNavBar();
  }, []);

  const items = featuresList.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: "blue", to: "cyan" }}
      >
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text size="lg" mt="sm" weight={500}>
        {feature.title}
      </Text>
      <Text color="dimmed" size="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <React.Fragment>
      <HeaderComponent links={headerLinks} />
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Col span={12} md={5}>
            <Title className={classes.title} order={2}>
              A fully featured React components library for your next project
            </Title>
            <Text color="dimmed">
              Build fully functional accessible web applications faster than
              ever – Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text>

            <Button
              variant="gradient"
              gradient={{ deg: 133, from: "blue", to: "cyan" }}
              size="lg"
              radius="md"
              mt="xl"
            >
              Get started
            </Button>
          </Col>
          <Col span={12} md={7}>
            <SimpleGrid
              cols={2}
              spacing={30}
              breakpoints={[{ maxWidth: "md", cols: 1 }]}
            >
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default features;
